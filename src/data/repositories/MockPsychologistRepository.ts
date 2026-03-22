import { AnonymousRequest } from '../../domain/entities/AnonymousRequest';
import { PsychologistRepository } from '../../domain/repositories/RepositoryInterfaces';

export class MockPsychologistRepository implements PsychologistRepository {
  getAnonymousRequests(): AnonymousRequest[] {
    return [
      {
        id: '1',
        anonymousId: 'User #4A2F',
        requestedAt: new Date('2026-03-20T15:30:00'),
        topMoods: [
          { mood: 'anxiety', percentage: 55 },
          { mood: 'sadness', percentage: 30 },
          { mood: 'neutral', percentage: 15 },
        ],
        recentKeywords: ['stressed', 'overwhelmed', 'worried', 'panic'],
        sessionCount: 3,
        note: 'Mentions difficulty sleeping and work pressure.',
      },
      {
        id: '2',
        anonymousId: 'User #B71C',
        requestedAt: new Date('2026-03-20T14:05:00'),
        topMoods: [
          { mood: 'sadness', percentage: 65 },
          { mood: 'anxiety', percentage: 20 },
          { mood: 'neutral', percentage: 15 },
        ],
        recentKeywords: ['lonely', 'sad', 'miss', 'cry', 'lost'],
        sessionCount: 1,
        note: 'First session. Expresses feelings of isolation.',
      },
      {
        id: '3',
        anonymousId: 'User #E39A',
        requestedAt: new Date('2026-03-20T12:45:00'),
        topMoods: [
          { mood: 'anger', percentage: 50 },
          { mood: 'anxiety', percentage: 35 },
          { mood: 'neutral', percentage: 15 },
        ],
        recentKeywords: ['frustrated', 'angry', 'mad', 'annoyed'],
        sessionCount: 7,
        note: 'Ongoing sessions. Showing progress with regulation techniques.',
      },
      {
        id: '4',
        anonymousId: 'User #D12B',
        requestedAt: new Date('2026-03-20T11:20:00'),
        topMoods: [
          { mood: 'neutral', percentage: 60 },
          { mood: 'sadness', percentage: 25 },
          { mood: 'anxiety', percentage: 15 },
        ],
        recentKeywords: ['tired', 'okay', 'better', 'calm'],
        sessionCount: 5,
      },
    ];
  }
}
