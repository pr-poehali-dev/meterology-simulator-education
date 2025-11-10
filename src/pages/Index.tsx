import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

type SimulationStage = 'intro' | 'mission' | 'laboratory' | 'analysis' | 'report';

const Index = () => {
  const [stage, setStage] = useState<SimulationStage>('intro');
  const [measurements, setMeasurements] = useState({
    volume: 0,
    ph: 0,
    sealed: false
  });
  const [progress, setProgress] = useState(0);

  const handleMeasurement = (type: 'volume' | 'ph' | 'sealed') => {
    const newMeasurements = { ...measurements };
    
    if (type === 'volume') {
      newMeasurements.volume = 248;
    } else if (type === 'ph') {
      newMeasurements.ph = 3.2;
    } else if (type === 'sealed') {
      newMeasurements.sealed = false;
    }
    
    setMeasurements(newMeasurements);
    
    const completed = Object.values(newMeasurements).filter(v => v !== 0 && v !== false).length;
    setProgress((completed / 3) * 100);
  };

  const renderIntro = () => (
    <div className="min-h-screen flex items-center justify-center p-6 bg-gradient-to-br from-blue-50 via-purple-50 to-orange-50">
      <Card className="max-w-4xl w-full shadow-2xl border-2 animate-fade-in">
        <CardHeader className="text-center space-y-4 pb-8">
          <div className="mx-auto w-20 h-20 bg-gradient-to-br from-primary to-secondary rounded-2xl flex items-center justify-center shadow-lg">
            <Icon name="Flask" size={40} className="text-white" />
          </div>
          <CardTitle className="text-4xl font-bold bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
            Мир Метрологии и Качества
          </CardTitle>
          <CardDescription className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Интерактивный симулятор для изучения метрологии, стандартизации и управления качеством
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid md:grid-cols-3 gap-4">
            {[
              { icon: 'Microscope', title: 'Исследование', desc: 'Проводите измерения' },
              { icon: 'FileCheck', title: 'Анализ', desc: 'Сравнивайте с ГОСТами' },
              { icon: 'Trophy', title: 'Решение', desc: 'Предлагайте улучшения' }
            ].map((item, idx) => (
              <Card key={idx} className="border-2 hover:border-primary transition-all hover:shadow-lg hover:scale-105">
                <CardContent className="pt-6 text-center space-y-2">
                  <div className="mx-auto w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
                    <Icon name={item.icon as any} className="text-primary" size={24} />
                  </div>
                  <h3 className="font-semibold text-lg">{item.title}</h3>
                  <p className="text-sm text-muted-foreground">{item.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
          
          <div className="bg-muted/50 rounded-lg p-6 space-y-3">
            <div className="flex items-center gap-2">
              <Icon name="Users" className="text-secondary" size={20} />
              <span className="font-semibold">Командная игра: 3-5 человек</span>
            </div>
            <div className="flex items-center gap-2">
              <Icon name="Clock" className="text-secondary" size={20} />
              <span className="font-semibold">Продолжительность: 45-90 минут</span>
            </div>
            <div className="flex items-center gap-2">
              <Icon name="GraduationCap" className="text-secondary" size={20} />
              <span className="font-semibold">Для учащихся 8-11 классов</span>
            </div>
          </div>

          <Button 
            size="lg" 
            className="w-full text-lg h-14 shadow-lg hover:shadow-xl transition-all"
            onClick={() => setStage('mission')}
          >
            Начать миссию
            <Icon name="ArrowRight" className="ml-2" size={20} />
          </Button>
        </CardContent>
      </Card>
    </div>
  );

  const renderMission = () => (
    <div className="min-h-screen p-6 bg-gradient-to-br from-blue-50 via-purple-50 to-orange-50">
      <div className="max-w-5xl mx-auto space-y-6">
        <Card className="border-2 shadow-xl">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-destructive/10 rounded-xl flex items-center justify-center">
                  <Icon name="AlertTriangle" className="text-destructive" size={24} />
                </div>
                <div>
                  <CardTitle className="text-2xl">Тайна кислого сока</CardTitle>
                  <CardDescription>Расследование на соковой фабрике</CardDescription>
                </div>
              </div>
              <Badge variant="outline" className="text-lg px-4 py-2">Миссия #1</Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="bg-destructive/5 border-2 border-destructive/20 rounded-lg p-6 space-y-3">
              <h3 className="font-bold text-lg flex items-center gap-2">
                <Icon name="Mail" className="text-destructive" size={20} />
                Жалобы от потребителей:
              </h3>
              <ul className="space-y-2 ml-6">
                <li className="flex items-start gap-2">
                  <Icon name="X" className="text-destructive mt-1 flex-shrink-0" size={16} />
                  <span>Сок слишком кислый, не соответствует вкусу</span>
                </li>
                <li className="flex items-start gap-2">
                  <Icon name="X" className="text-destructive mt-1 flex-shrink-0" size={16} />
                  <span>Упаковка протекает при транспортировке</span>
                </li>
                <li className="flex items-start gap-2">
                  <Icon name="X" className="text-destructive mt-1 flex-shrink-0" size={16} />
                  <span>Объём не соответствует заявленному на этикетке</span>
                </li>
              </ul>
            </div>

            <div className="bg-secondary/5 border-2 border-secondary/20 rounded-lg p-6 space-y-3">
              <h3 className="font-bold text-lg flex items-center gap-2">
                <Icon name="FileText" className="text-secondary" size={20} />
                Нормативные документы:
              </h3>
              <div className="grid md:grid-cols-2 gap-3">
                <div className="bg-card rounded-lg p-4 border">
                  <p className="font-semibold mb-1">ГОСТ 32104-2013</p>
                  <p className="text-sm text-muted-foreground">Соки фруктовые. Общие технические условия</p>
                </div>
                <div className="bg-card rounded-lg p-4 border">
                  <p className="font-semibold mb-1">ТР ТС 021/2011</p>
                  <p className="text-sm text-muted-foreground">О безопасности пищевой продукции</p>
                </div>
              </div>
            </div>

            <div className="bg-primary/5 border-2 border-primary/20 rounded-lg p-6">
              <h3 className="font-bold text-lg mb-3 flex items-center gap-2">
                <Icon name="Target" className="text-primary" size={20} />
                Ваша задача:
              </h3>
              <p className="text-muted-foreground">
                Провести лабораторные измерения образцов продукции, выявить несоответствия стандартам 
                и предложить корректирующие действия для улучшения качества.
              </p>
            </div>

            <Button 
              size="lg" 
              className="w-full text-lg h-14"
              onClick={() => setStage('laboratory')}
            >
              Перейти в лабораторию
              <Icon name="ArrowRight" className="ml-2" size={20} />
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );

  const renderLaboratory = () => (
    <div className="min-h-screen p-6 bg-gradient-to-br from-blue-50 via-purple-50 to-orange-50">
      <div className="max-w-6xl mx-auto space-y-6">
        <Card className="border-2 shadow-xl">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
                  <Icon name="Microscope" className="text-primary" size={24} />
                </div>
                <div>
                  <CardTitle className="text-2xl">Исследовательская лаборатория</CardTitle>
                  <CardDescription>Проведите измерения образцов</CardDescription>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm text-muted-foreground">Прогресс</p>
                <p className="text-2xl font-bold text-primary">{Math.round(progress)}%</p>
              </div>
            </div>
            <Progress value={progress} className="h-2 mt-4" />
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="volume" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="volume" className="gap-2">
                  <Icon name="Beaker" size={16} />
                  Объём
                </TabsTrigger>
                <TabsTrigger value="ph" className="gap-2">
                  <Icon name="TestTube" size={16} />
                  Кислотность
                </TabsTrigger>
                <TabsTrigger value="sealed" className="gap-2">
                  <Icon name="Package" size={16} />
                  Герметичность
                </TabsTrigger>
              </TabsList>

              <TabsContent value="volume" className="space-y-4 mt-6">
                <Card className="border-2">
                  <CardContent className="pt-6 space-y-4">
                    <div className="flex items-start gap-4">
                      <div className="w-16 h-16 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0">
                        <Icon name="Beaker" className="text-primary" size={32} />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-bold text-lg mb-2">Измерение объёма</h3>
                        <p className="text-muted-foreground mb-4">
                          Используйте мензурку и весы для определения реального объёма сока в упаковке. 
                          Сравните с заявленным на этикетке (250 мл).
                        </p>
                        <div className="bg-muted/50 rounded-lg p-4 space-y-2">
                          <p className="font-semibold">Норма по ГОСТ: 250 ± 5 мл</p>
                          {measurements.volume > 0 && (
                            <div className="flex items-center gap-2 mt-3">
                              <Badge variant={measurements.volume >= 245 && measurements.volume <= 255 ? "default" : "destructive"}>
                                Результат: {measurements.volume} мл
                              </Badge>
                              {measurements.volume < 245 && (
                                <span className="text-sm text-destructive flex items-center gap-1">
                                  <Icon name="AlertCircle" size={16} />
                                  Отклонение от нормы
                                </span>
                              )}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                    {measurements.volume === 0 ? (
                      <Button 
                        className="w-full"
                        onClick={() => handleMeasurement('volume')}
                      >
                        <Icon name="Play" className="mr-2" size={16} />
                        Провести измерение
                      </Button>
                    ) : (
                      <Button variant="outline" className="w-full" disabled>
                        <Icon name="Check" className="mr-2" size={16} />
                        Измерение завершено
                      </Button>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="ph" className="space-y-4 mt-6">
                <Card className="border-2">
                  <CardContent className="pt-6 space-y-4">
                    <div className="flex items-start gap-4">
                      <div className="w-16 h-16 bg-secondary/10 rounded-xl flex items-center justify-center flex-shrink-0">
                        <Icon name="TestTube" className="text-secondary" size={32} />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-bold text-lg mb-2">Определение кислотности (pH)</h3>
                        <p className="text-muted-foreground mb-4">
                          Используйте pH-метр или индикаторные полоски для определения уровня кислотности. 
                          Апельсиновый сок должен иметь pH в диапазоне 3.5-4.5.
                        </p>
                        <div className="bg-muted/50 rounded-lg p-4 space-y-2">
                          <p className="font-semibold">Норма по ГОСТ: pH 3.5-4.5</p>
                          {measurements.ph > 0 && (
                            <div className="flex items-center gap-2 mt-3">
                              <Badge variant={measurements.ph >= 3.5 && measurements.ph <= 4.5 ? "default" : "destructive"}>
                                Результат: pH {measurements.ph}
                              </Badge>
                              {measurements.ph < 3.5 && (
                                <span className="text-sm text-destructive flex items-center gap-1">
                                  <Icon name="AlertCircle" size={16} />
                                  Слишком кислый!
                                </span>
                              )}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                    {measurements.ph === 0 ? (
                      <Button 
                        className="w-full"
                        onClick={() => handleMeasurement('ph')}
                      >
                        <Icon name="Play" className="mr-2" size={16} />
                        Провести измерение
                      </Button>
                    ) : (
                      <Button variant="outline" className="w-full" disabled>
                        <Icon name="Check" className="mr-2" size={16} />
                        Измерение завершено
                      </Button>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="sealed" className="space-y-4 mt-6">
                <Card className="border-2">
                  <CardContent className="pt-6 space-y-4">
                    <div className="flex items-start gap-4">
                      <div className="w-16 h-16 bg-accent/10 rounded-xl flex items-center justify-center flex-shrink-0">
                        <Icon name="Package" className="text-accent" size={32} />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-bold text-lg mb-2">Проверка герметичности</h3>
                        <p className="text-muted-foreground mb-4">
                          Проверьте целостность упаковки под давлением и в воде. 
                          Упаковка должна сохранять герметичность при нормальных условиях транспортировки.
                        </p>
                        <div className="bg-muted/50 rounded-lg p-4 space-y-2">
                          <p className="font-semibold">Требование: Полная герметичность</p>
                          {measurements.sealed !== null && measurements.volume > 0 && measurements.ph > 0 && (
                            <div className="flex items-center gap-2 mt-3">
                              <Badge variant="destructive">
                                Результат: Негерметична
                              </Badge>
                              <span className="text-sm text-destructive flex items-center gap-1">
                                <Icon name="AlertCircle" size={16} />
                                Обнаружена протечка
                              </span>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                    {measurements.volume === 0 || measurements.ph === 0 ? (
                      <Button variant="outline" className="w-full" disabled>
                        <Icon name="Lock" className="mr-2" size={16} />
                        Завершите предыдущие измерения
                      </Button>
                    ) : !measurements.sealed ? (
                      <Button 
                        className="w-full"
                        onClick={() => handleMeasurement('sealed')}
                      >
                        <Icon name="Play" className="mr-2" size={16} />
                        Провести проверку
                      </Button>
                    ) : (
                      <Button variant="outline" className="w-full" disabled>
                        <Icon name="Check" className="mr-2" size={16} />
                        Проверка завершена
                      </Button>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>

            {progress === 100 && (
              <Button 
                size="lg" 
                className="w-full text-lg h-14 mt-6 animate-fade-in"
                onClick={() => setStage('analysis')}
              >
                Перейти к анализу результатов
                <Icon name="ArrowRight" className="ml-2" size={20} />
              </Button>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );

  const renderAnalysis = () => (
    <div className="min-h-screen p-6 bg-gradient-to-br from-blue-50 via-purple-50 to-orange-50">
      <div className="max-w-6xl mx-auto space-y-6">
        <Card className="border-2 shadow-xl">
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-secondary/10 rounded-xl flex items-center justify-center">
                <Icon name="BarChart" className="text-secondary" size={24} />
              </div>
              <div>
                <CardTitle className="text-2xl">Анализ результатов</CardTitle>
                <CardDescription>Сравнение с требованиями ГОСТ</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid md:grid-cols-3 gap-4">
              <Card className="border-2 border-destructive/50 bg-destructive/5">
                <CardContent className="pt-6 space-y-3">
                  <div className="flex items-center justify-between">
                    <Icon name="Beaker" className="text-destructive" size={28} />
                    <Badge variant="destructive">Отклонение</Badge>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Объём</p>
                    <p className="text-2xl font-bold">{measurements.volume} мл</p>
                    <p className="text-sm text-destructive mt-1">Норма: 245-255 мл</p>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-2 border-destructive/50 bg-destructive/5">
                <CardContent className="pt-6 space-y-3">
                  <div className="flex items-center justify-between">
                    <Icon name="TestTube" className="text-destructive" size={28} />
                    <Badge variant="destructive">Отклонение</Badge>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Кислотность</p>
                    <p className="text-2xl font-bold">pH {measurements.ph}</p>
                    <p className="text-sm text-destructive mt-1">Норма: pH 3.5-4.5</p>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-2 border-destructive/50 bg-destructive/5">
                <CardContent className="pt-6 space-y-3">
                  <div className="flex items-center justify-between">
                    <Icon name="Package" className="text-destructive" size={28} />
                    <Badge variant="destructive">Отклонение</Badge>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Герметичность</p>
                    <p className="text-2xl font-bold">Нарушена</p>
                    <p className="text-sm text-destructive mt-1">Требуется: Герметична</p>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card className="border-2 border-destructive/30">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Icon name="AlertTriangle" className="text-destructive" size={20} />
                  Выявленные несоответствия
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-start gap-3 p-3 bg-destructive/5 rounded-lg">
                    <Icon name="XCircle" className="text-destructive mt-1 flex-shrink-0" size={20} />
                    <div>
                      <p className="font-semibold">Недолив продукции</p>
                      <p className="text-sm text-muted-foreground">Объём на 2 мл меньше минимально допустимого по ГОСТ 32104-2013</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-3 bg-destructive/5 rounded-lg">
                    <Icon name="XCircle" className="text-destructive mt-1 flex-shrink-0" size={20} />
                    <div>
                      <p className="font-semibold">Повышенная кислотность</p>
                      <p className="text-sm text-muted-foreground">pH 3.2 ниже нормы (3.5-4.5), нарушение органолептических свойств</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-3 bg-destructive/5 rounded-lg">
                    <Icon name="XCircle" className="text-destructive mt-1 flex-shrink-0" size={20} />
                    <div>
                      <p className="font-semibold">Дефект упаковки</p>
                      <p className="text-sm text-muted-foreground">Нарушение герметичности, не соответствует ТР ТС 021/2011</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-2 border-primary/30">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Icon name="Lightbulb" className="text-primary" size={20} />
                  Рекомендуемые корректирующие действия
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-start gap-3 p-3 bg-primary/5 rounded-lg">
                  <Icon name="CheckCircle" className="text-primary mt-1 flex-shrink-0" size={20} />
                  <div>
                    <p className="font-semibold">Калибровка дозаторов</p>
                    <p className="text-sm text-muted-foreground">Провести поверку и настройку оборудования розлива</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-3 bg-primary/5 rounded-lg">
                  <Icon name="CheckCircle" className="text-primary mt-1 flex-shrink-0" size={20} />
                  <div>
                    <p className="font-semibold">Корректировка рецептуры</p>
                    <p className="text-sm text-muted-foreground">Пересмотреть соотношение кислот в составе сока</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-3 bg-primary/5 rounded-lg">
                  <Icon name="CheckCircle" className="text-primary mt-1 flex-shrink-0" size={20} />
                  <div>
                    <p className="font-semibold">Замена поставщика упаковки</p>
                    <p className="text-sm text-muted-foreground">Провести аудит качества упаковочных материалов</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Button 
              size="lg" 
              className="w-full text-lg h-14"
              onClick={() => setStage('report')}
            >
              Сформировать отчёт
              <Icon name="FileText" className="ml-2" size={20} />
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );

  const renderReport = () => (
    <div className="min-h-screen p-6 bg-gradient-to-br from-blue-50 via-purple-50 to-orange-50">
      <div className="max-w-5xl mx-auto space-y-6">
        <Card className="border-2 shadow-xl">
          <CardHeader className="text-center space-y-4">
            <div className="mx-auto w-20 h-20 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl flex items-center justify-center shadow-lg animate-scale-in">
              <Icon name="Trophy" size={40} className="text-white" />
            </div>
            <CardTitle className="text-3xl">Миссия выполнена!</CardTitle>
            <CardDescription className="text-lg">
              Вы успешно провели расследование и выявили причины несоответствий
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <Card className="border-2">
              <CardHeader>
                <CardTitle className="text-xl flex items-center gap-2">
                  <Icon name="ClipboardCheck" size={20} />
                  Итоговый отчёт
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <p className="text-sm text-muted-foreground">Проведено измерений</p>
                    <p className="text-2xl font-bold">3</p>
                  </div>
                  <div className="space-y-2">
                    <p className="text-sm text-muted-foreground">Выявлено отклонений</p>
                    <p className="text-2xl font-bold text-destructive">3</p>
                  </div>
                  <div className="space-y-2">
                    <p className="text-sm text-muted-foreground">Предложено решений</p>
                    <p className="text-2xl font-bold text-primary">3</p>
                  </div>
                  <div className="space-y-2">
                    <p className="text-sm text-muted-foreground">Использовано ГОСТов</p>
                    <p className="text-2xl font-bold">2</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-2 bg-green-50/50">
              <CardContent className="pt-6">
                <h3 className="font-bold text-lg mb-3 flex items-center gap-2">
                  <Icon name="Award" className="text-green-600" size={24} />
                  Вы освоили:
                </h3>
                <ul className="space-y-2">
                  {[
                    'Проведение лабораторных измерений',
                    'Работу с нормативными документами (ГОСТ)',
                    'Анализ соответствия продукции стандартам',
                    'Разработку корректирующих действий'
                  ].map((skill, idx) => (
                    <li key={idx} className="flex items-center gap-2">
                      <Icon name="Check" className="text-green-600 flex-shrink-0" size={18} />
                      <span>{skill}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <div className="flex gap-3">
              <Button 
                size="lg" 
                className="flex-1 h-12"
                onClick={() => {
                  setStage('intro');
                  setMeasurements({ volume: 0, ph: 0, sealed: false });
                  setProgress(0);
                }}
              >
                <Icon name="RotateCcw" className="mr-2" size={20} />
                Начать заново
              </Button>
              <Button 
                size="lg" 
                variant="outline"
                className="flex-1 h-12"
              >
                <Icon name="Share2" className="mr-2" size={20} />
                Поделиться результатами
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );

  return (
    <>
      {stage === 'intro' && renderIntro()}
      {stage === 'mission' && renderMission()}
      {stage === 'laboratory' && renderLaboratory()}
      {stage === 'analysis' && renderAnalysis()}
      {stage === 'report' && renderReport()}
    </>
  );
};

export default Index;
