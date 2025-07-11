import AddRoom from "@/components/add-room";
import InitialLayout from "@/components/initial-layout";
import { Button } from "@/components/ui/button";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import { useSalon } from "@/hooks/SalonContext";
import { client } from "@/supabase/client";
import { MoveUpRight } from "lucide-react";
import { useEffect, useState } from "react";
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";

interface Data {
  month: string;
  total_ingresos: number;
  total_reservas: number;
}

const mesesBase: Data[] = [
  { month: "January", total_ingresos: 0, total_reservas: 0 },
  { month: "February", total_ingresos: 0, total_reservas: 0 },
  { month: "March", total_ingresos: 0, total_reservas: 0 },
  { month: "April", total_ingresos: 0, total_reservas: 0 },
  { month: "May", total_ingresos: 0, total_reservas: 0 },
  { month: "June", total_ingresos: 0, total_reservas: 0 },
  { month: "July", total_ingresos: 0, total_reservas: 0 },
  { month: "August", total_ingresos: 0, total_reservas: 0 },
  { month: "September", total_ingresos: 0, total_reservas: 0 },
  { month: "October", total_ingresos: 0, total_reservas: 0 },
  { month: "November", total_ingresos: 0, total_reservas: 0 },
  { month: "December", total_ingresos: 0, total_reservas: 0 },
];

export default function Dashboard() {
  const { salones, promedio, activeSalon } = useSalon();
  const [openSheet, setOpenSheet] = useState(false);
  const fechaActual = new Date();
  const mesActual = fechaActual.getMonth();
  const anioActual = fechaActual.getFullYear();
  const [chartData, setChartData] = useState<Data[]>([...mesesBase]);
  const [horariosData, setHorariosData] = useState<{hora: string, reservas: number}[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const obtenerData = async () => {
      if (!activeSalon?.id) {
        setChartData([...mesesBase]);
        setHorariosData([]);
        setIsLoading(false);
        return;
      }

      setIsLoading(true);
      
      try {
        // Obtener datos mensuales
        const { data: dataMeses, error: errorMeses } = await client.rpc("get_reservas", {
          anio: anioActual,
          salon: activeSalon.id,
        });

        if (errorMeses) {
          console.error("Error al obtener datos mensuales:", errorMeses);
        }

        // Obtener datos de horarios populares
        const { data: dataHorarios, error: errorHorarios } = await client.rpc("get_horarios_populares", {
          salon_id: activeSalon.id,
        });

        if (errorHorarios) {
          console.error("Error al obtener horarios populares:", errorHorarios);
        }

        console.log("Datos del RPC:", dataMeses); // Para debugging
        console.log("Horarios populares:", dataHorarios); // Para debugging

        // Procesar datos mensuales
        if (dataMeses) {
          const normalizarMes = (nombre: string) =>
            nombre.charAt(0).toUpperCase() + nombre.slice(1).toLowerCase().trim();

          const dataMap = new Map();
          dataMeses.forEach((d: any) => {
            const mesNormalizado = normalizarMes(d.nombre_mes);
            dataMap.set(mesNormalizado, {
              total_ingresos: Number(d.total_ingresos) || 0,
              total_reservas: Number(d.total_reservas) || 0,
            });
          });

          const merged = mesesBase.map((mes) => {
            const encontrado = dataMap.get(mes.month);
            return encontrado 
              ? { 
                  month: mes.month, 
                  total_ingresos: encontrado.total_ingresos,
                  total_reservas: encontrado.total_reservas 
                }
              : { ...mes };
          });

          console.log("Datos procesados:", merged); // Para debugging
          setChartData(merged);
        }

        // Procesar datos de horarios
        if (dataHorarios && dataHorarios.length > 0) {
          const horariosFormateados = dataHorarios.map((horario: any) => ({
            hora: horario.hora_inicio, // Formato HH:MM:SS
            reservas: Number(horario.total_reservas) || 0,
          }));

          // Generar horarios desde apertura hasta cierre del salón
          const horariosCompletos = generarHorariosCompletos(
            activeSalon.horarioApertura || "14:00:00",
            activeSalon.horarioCierre || "23:59:00",
            horariosFormateados
          );

          setHorariosData(horariosCompletos);
        } else {
          // Si no hay datos, generar horarios vacíos
          const horariosVacios = generarHorariosCompletos(
            activeSalon.horarioApertura || "14:00:00",
            activeSalon.horarioCierre || "23:59:00",
            []
          );
          setHorariosData(horariosVacios);
        }

      } catch (error) {
        console.error("Error al obtener datos:", error);
        setChartData([...mesesBase]);
        setHorariosData([]);
      } finally {
        setIsLoading(false);
      }
    };

    obtenerData();
  }, [activeSalon?.id, anioActual]); // Agregué anioActual como dependencia

  // Función para generar horarios completos del salón
  const generarHorariosCompletos = (
    horaApertura: string,
    horaCierre: string,
    horariosConDatos: {hora: string, reservas: number}[]
  ) => {
    const horarios = [];
    const dataMap = new Map();
    
    // Crear mapa de horarios con datos
    horariosConDatos.forEach(h => {
      dataMap.set(h.hora.substring(0, 5), h.reservas); // Tomar solo HH:MM
    });

    // Extraer horas de apertura y cierre
    const [horaAp] = horaApertura.split(':').map(Number);
    const [horaCi] = horaCierre.split(':').map(Number);
    
    // Generar horarios de hora en hora desde apertura hasta cierre
    for (let hora = horaAp; hora <= horaCi; hora++) {
      const horaStr = `${hora.toString().padStart(2, '0')}:00`;
      const reservasEnEstaHora = dataMap.get(horaStr) || 0;
      
      horarios.push({
        hora: horaStr,
        reservas: reservasEnEstaHora
      });
      
      // Si llegamos a la hora de cierre, no agregar más
      if (hora === horaCi) break;
    }

    return horarios;
  };

  const chartConfig = {
    ingresos: {
      label: "Ingresos",
      color: "#2563eb",
    },
    reservas: {
      label: "Reservas",
      color: "#60a5fa",
    },
  } satisfies ChartConfig;

  const horasConfig = {
    hora: {
      label: "Hora",
      color: "#2563eb",
    },
    reservas: {
      label: "Reservas",
      color: "#60a5fa",
    },
  };

  // Datos del mes actual para mostrar en las cards
  const datosDelMes = chartData[mesActual] || { total_ingresos: 0, total_reservas: 0 };

  // Filtrar datos para mostrar solo el mes actual en las gráficas
  const chartDataMesActual = chartData.filter((_, index) => index === mesActual);

  return (
    <Sheet open={openSheet} onOpenChange={setOpenSheet}>
      <InitialLayout>
        {salones.length == 0 ? (
          <div className="flex flex-col items-center">
            <p className="text-xl">
              No tienes salones añadidos, necesitas añadir uno
            </p>
            <Button
              onClick={() => setOpenSheet(true)}
              className="h-12 flex items-center mt-3"
            >
              Añadir uno
              <MoveUpRight />
            </Button>
          </div>
        ) : (
          <>
            {isLoading ? (
              <div className="flex justify-center items-center h-64">
                <p>Cargando datos...</p>
              </div>
            ) : chartData.length > 0 ? (
              <>
                <div className="grid grid-cols-3 gap-4 px-5">
                  {/* Estadisticas */}
                  {/* Ingresos */}
                  <div className="grid grid-cols-2 grid-rows-2 gap-2 border rounded-xl p-4">
                    <div className="row-span-2 col-start-2 row-start-1">
                      <ChartContainer config={chartConfig}>
                        <BarChart accessibilityLayer data={chartDataMesActual}>
                          <CartesianGrid vertical={false} />
                          <ChartTooltip
                            cursor={false}
                            content={<ChartTooltipContent hideLabel />}
                          />
                          <Bar
                            dataKey="total_ingresos"
                            fill="var(--color-ingresos)"
                          />
                        </BarChart>
                      </ChartContainer>
                    </div>
                    <div className="col-start-1 row-start-1">
                      Ingresos del mes
                    </div>
                    <div>${datosDelMes.total_ingresos}</div>
                  </div>
                  {/* Reservas */}
                  <div className="grid grid-cols-2 grid-rows-2 gap-2 border rounded-xl p-4">
                    <div className="row-span-2 col-start-2 row-start-1">
                      <ChartContainer config={chartConfig}>
                        <BarChart accessibilityLayer data={chartDataMesActual}>
                          <CartesianGrid vertical={false} />
                          <ChartTooltip
                            cursor={false}
                            content={<ChartTooltipContent hideLabel />}
                          />
                          <Bar
                            dataKey="total_reservas"
                            fill="var(--color-reservas)"
                          />
                        </BarChart>
                      </ChartContainer>
                    </div>
                    <div className="col-start-1 row-start-1">
                      Reservas del mes
                    </div>
                    <div>{datosDelMes.total_reservas}</div>
                  </div>
                  {/* Calificación */}
                  <div className="grid grid-cols-2 grid-rows-2 gap-2 border rounded-xl p-4">
                    <div className="row-span-2 col-start-2 row-start-1" />
                    <div className="col-start-1 row-start-1">Calificación</div>
                    <div>{promedio}</div>
                  </div>
                  {/* Horarios populares */}
                </div>
                <div className="row-span-2 p-5">
                  <div className="border rounded-xl p-4 h-full">
                    <div className="col-start-1 row-start-1">
                      Horarios más populares
                    </div>
                    <div className="min-h-full">
                      <ChartContainer config={horasConfig}>
                        <BarChart
                          accessibilityLayer
                          data={horariosData}
                          layout="vertical"
                        >
                          <XAxis type="number" dataKey="reservas" hide />
                          <YAxis
                            dataKey="hora"
                            type="category"
                            tickLine={false}
                            tickMargin={10}
                            axisLine={false}
                          />
                          <ChartTooltip
                            cursor={false}
                            content={<ChartTooltipContent hideLabel />}
                          />
                          <Bar
                            dataKey="reservas"
                            fill="var(--color-reservas)"
                            radius={5}
                          />
                        </BarChart>
                      </ChartContainer>
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <div className="flex justify-center items-center h-64">
                <p>No hay datos disponibles para mostrar</p>
              </div>
            )}
          </>
        )}
      </InitialLayout>
      <SheetContent className="min-w-1/2">
        <AddRoom modalClose={setOpenSheet} />
      </SheetContent>
    </Sheet>
  );
}