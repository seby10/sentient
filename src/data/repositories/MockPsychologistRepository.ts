import { AnonymousRequest } from '../../domain/entities/AnonymousRequest';
import { PsychologistRepository } from '../../domain/repositories/RepositoryInterfaces';

export class MockPsychologistRepository implements PsychologistRepository {
  getAnonymousRequests(): AnonymousRequest[] {
    return [
      {
        id: '1',
        anonymousId: 'Usuario #4A2F',
        requestedAt: new Date('2026-03-20T15:30:00'),
        topMoods: [
          { mood: 'anxiety', percentage: 55 },
          { mood: 'sadness', percentage: 30 },
          { mood: 'neutral', percentage: 15 },
        ],
        recentKeywords: ['estresado', 'abrumado', 'preocupado', 'pánico'],
        sessionCount: 3,
        note: 'Menciona dificultad para dormir y presión laboral.',
      },
      {
        id: '2',
        anonymousId: 'Usuario #B71C',
        requestedAt: new Date('2026-03-20T14:05:00'),
        topMoods: [
          { mood: 'sadness', percentage: 65 },
          { mood: 'anxiety', percentage: 20 },
          { mood: 'neutral', percentage: 15 },
        ],
        recentKeywords: ['triste', 'solitario', 'perdido', 'llorar', 'vacío'],
        sessionCount: 1,
        note: 'Primera sesión. Expresa sentimientos de aislamiento y soledad.',
      },
      {
        id: '3',
        anonymousId: 'Usuario #E39A',
        requestedAt: new Date('2026-03-20T12:45:00'),
        topMoods: [
          { mood: 'anger', percentage: 50 },
          { mood: 'anxiety', percentage: 35 },
          { mood: 'neutral', percentage: 15 },
        ],
        recentKeywords: ['frustrado', 'enojado', 'irritado', 'molesto'],
        sessionCount: 7,
        note: 'Sesiones continuas. Muestra avances con técnicas de regulación emocional.',
      },
      {
        id: '4',
        anonymousId: 'Usuario #D12B',
        requestedAt: new Date('2026-03-20T11:20:00'),
        topMoods: [
          { mood: 'neutral', percentage: 60 },
          { mood: 'sadness', percentage: 25 },
          { mood: 'anxiety', percentage: 15 },
        ],
        recentKeywords: ['cansado', 'bien', 'mejor', 'calma'],
        sessionCount: 5,
        note: 'Se siente cansado por la rutina. Progreso estable entre sesiones.',
      },
    ];
  }
}
