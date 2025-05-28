
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Clock, Calendar, TrendingUp, Users } from 'lucide-react';

interface BestTimeToPostProps {
  platform?: string;
  audienceData?: any;
  onTimeSelected?: (time: string, day: string) => void;
}

const BestTimeToPost: React.FC<BestTimeToPostProps> = ({
  platform = 'instagram',
  audienceData,
  onTimeSelected
}) => {
  const [recommendations, setRecommendations] = useState<any>(null);

  useEffect(() => {
    generateTimeRecommendations();
  }, [platform, audienceData]);

  const generateTimeRecommendations = () => {
    // Simulação de análise de dados para sugerir melhores horários
    const mockData = {
      instagram: {
        bestDays: [
          { day: 'Terça-feira', score: 92, reason: 'Maior engajamento da semana' },
          { day: 'Quarta-feira', score: 89, reason: 'Alto alcance orgânico' },
          { day: 'Quinta-feira', score: 85, reason: 'Boa interação' }
        ],
        bestTimes: [
          { time: '11:00', score: 95, engagement: 'Alto', reason: 'Pausa do café' },
          { time: '14:00', score: 88, engagement: 'Médio-Alto', reason: 'Pausa do almoço' },
          { time: '19:00', score: 92, engagement: 'Alto', reason: 'Fim do expediente' },
          { time: '21:00', score: 87, engagement: 'Médio-Alto', reason: 'Relaxamento noturno' }
        ],
        audienceInsights: {
          peakActivity: '19:00 - 21:00',
          timezone: 'America/Sao_Paulo',
          ageGroup: '25-34',
          deviceUsage: '78% Mobile'
        }
      },
      facebook: {
        bestDays: [
          { day: 'Quarta-feira', score: 90, reason: 'Pico de atividade semanal' },
          { day: 'Quinta-feira', score: 86, reason: 'Alto compartilhamento' },
          { day: 'Domingo', score: 82, reason: 'Tempo livre dos usuários' }
        ],
        bestTimes: [
          { time: '09:00', score: 89, engagement: 'Alto', reason: 'Início da manhã' },
          { time: '15:00', score: 85, engagement: 'Médio-Alto', reason: 'Meio da tarde' },
          { time: '20:00', score: 91, engagement: 'Alto', reason: 'Prime time' }
        ],
        audienceInsights: {
          peakActivity: '20:00 - 22:00',
          timezone: 'America/Sao_Paulo',
          ageGroup: '30-45',
          deviceUsage: '65% Mobile'
        }
      },
      linkedin: {
        bestDays: [
          { day: 'Terça-feira', score: 94, reason: 'Dia mais produtivo' },
          { day: 'Quarta-feira', score: 91, reason: 'Alto networking' },
          { day: 'Quinta-feira', score: 88, reason: 'Preparação para fim de semana' }
        ],
        bestTimes: [
          { time: '08:00', score: 93, engagement: 'Alto', reason: 'Início do expediente' },
          { time: '12:00', score: 87, engagement: 'Médio-Alto', reason: 'Pausa do almoço' },
          { time: '17:00', score: 90, engagement: 'Alto', reason: 'Fim do expediente' }
        ],
        audienceInsights: {
          peakActivity: '08:00 - 10:00',
          timezone: 'America/Sao_Paulo',
          ageGroup: '28-45',
          deviceUsage: '45% Desktop'
        }
      }
    };

    setRecommendations(mockData[platform as keyof typeof mockData] || mockData.instagram);
  };

  const getEngagementColor = (engagement: string) => {
    switch (engagement) {
      case 'Alto': return 'text-green-600 bg-green-100';
      case 'Médio-Alto': return 'text-yellow-600 bg-yellow-100';
      case 'Médio': return 'text-orange-600 bg-orange-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const handleTimeClick = (time: string, day: string) => {
    if (onTimeSelected) {
      onTimeSelected(time, day);
    }
  };

  if (!recommendations) return null;

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="h-5 w-5" />
            Melhores Horários para Postar
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Insight da Audiência */}
          <div className="grid grid-cols-2 gap-4 p-4 bg-muted/50 rounded-lg">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Users className="h-4 w-4 text-primary" />
                <span className="text-sm font-medium">Pico de Atividade</span>
              </div>
              <p className="text-lg font-semibold">{recommendations.audienceInsights.peakActivity}</p>
            </div>
            <div>
              <div className="flex items-center gap-2 mb-2">
                <TrendingUp className="h-4 w-4 text-primary" />
                <span className="text-sm font-medium">Faixa Etária Principal</span>
              </div>
              <p className="text-lg font-semibold">{recommendations.audienceInsights.ageGroup} anos</p>
            </div>
          </div>

          {/* Melhores Horários */}
          <div>
            <h4 className="font-semibold mb-4">Horários Recomendados</h4>
            <div className="space-y-3">
              {recommendations.bestTimes.map((timeSlot: any, index: number) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-3 border rounded-lg cursor-pointer hover:bg-muted/50 transition-colors"
                  onClick={() => handleTimeClick(timeSlot.time, 'Hoje')}
                >
                  <div className="flex items-center gap-3">
                    <div className="text-lg font-semibold min-w-[60px]">
                      {timeSlot.time}
                    </div>
                    <div>
                      <Badge className={getEngagementColor(timeSlot.engagement)}>
                        {timeSlot.engagement}
                      </Badge>
                      <p className="text-sm text-muted-foreground mt-1">
                        {timeSlot.reason}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-semibold text-primary">
                      {timeSlot.score}%
                    </div>
                    <Progress value={timeSlot.score} className="w-20" />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Melhores Dias */}
          <div>
            <h4 className="font-semibold mb-4">Melhores Dias da Semana</h4>
            <div className="space-y-3">
              {recommendations.bestDays.map((dayData: any, index: number) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-3 border rounded-lg"
                >
                  <div>
                    <div className="font-medium">{dayData.day}</div>
                    <p className="text-sm text-muted-foreground">
                      {dayData.reason}
                    </p>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-semibold text-primary">
                      {dayData.score}%
                    </div>
                    <Progress value={dayData.score} className="w-20" />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Dica da IA */}
          <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <TrendingUp className="h-4 w-4 text-blue-600" />
              <span className="font-medium text-blue-900">Dica da IA</span>
            </div>
            <p className="text-sm text-blue-800">
              Com base na análise dos seus dados, posts publicados às{' '}
              <strong>{recommendations.bestTimes[0].time}</strong> nas{' '}
              <strong>{recommendations.bestDays[0].day}s</strong> têm{' '}
              <strong>{recommendations.bestTimes[0].score}% mais engajamento</strong> que a média.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default BestTimeToPost;
