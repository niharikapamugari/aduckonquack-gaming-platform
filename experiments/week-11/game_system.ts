/**
 * Week 11: TypeScript Gaming Architecture
 * Demonstrates Classes, Interfaces, Enums, Generics, and Typed Functions
 */

// 1. Enums
export enum GameGenre {
  ARCADE = "Arcade",
  PUZZLE = "Puzzle",
  RACING = "Racing",
  ACTION = "Action",
  SCIFI = "Sci-Fi",
  RPG = "RPG"
}

// 2. Interfaces
export interface IGame {
  readonly id: string;
  title: string;
  genre: GameGenre;
  rating: number;
  playCount: number;
  calculateScore(baseScore: number, bonusMultiplier: number): number;
}

export interface IPlayer {
  username: string;
  studentId: string;
  email: string;
  level: number;
  totalScore: number;
  addScore(points: number): void;
}

export interface IScoreEntry {
  playerId: string;
  gameId: string;
  score: number;
  timestamp: Date;
}

// 3. Abstract Class implementing IGame
export abstract class BaseGame implements IGame {
  constructor(
    public readonly id: string,
    public title: string,
    public genre: GameGenre,
    public rating: number = 4.5,
    public playCount: number = 0
  ) {}

  public incrementPlay(): void {
    this.playCount++;
  }

  public abstract calculateScore(baseScore: number, bonusMultiplier: number): number;
}

// 4. Concrete Subclasses
export class ArcadeGame extends BaseGame {
  constructor(id: string, title: string, rating: number = 4.8) {
    super(id, title, GameGenre.ARCADE, rating);
  }

  public calculateScore(baseScore: number, bonusMultiplier: number): number {
    return Math.round(baseScore * bonusMultiplier * 1.5);
  }
}

export class RacingGame extends BaseGame {
  constructor(id: string, title: string, rating: number = 4.7) {
    super(id, title, GameGenre.RACING, rating);
  }

  public calculateScore(distanceTraveled: number, speedMultiplier: number): number {
    return Math.round((distanceTraveled * 2) + (speedMultiplier * 100));
  }
}

// 5. Player Class implementing IPlayer
export class DuckPlayer implements IPlayer {
  public level: number = 1;
  public totalScore: number = 0;

  constructor(
    public username: string,
    public studentId: string,
    public email: string
  ) {}

  public addScore(points: number): void {
    this.totalScore += points;
    this.level = Math.floor(this.totalScore / 500) + 1;
  }

  public getProfileSummary(): string {
    return `Player [${this.username}] | Student ID: ${this.studentId} | Level: ${this.level} | Total Points: ${this.totalScore}`;
  }
}

// 6. Generic Repository Class
export class GameRepository<T extends { id: string }> {
  private items: Map<string, T> = new Map();

  public add(item: T): void {
    this.items.set(item.id, item);
  }

  public getById(id: string): T | undefined {
    return this.items.get(id);
  }

  public getAll(): T[] {
    return Array.from(this.items.values());
  }
}

// 7. Typed High-Order Functions
export function filterGamesByRating(games: IGame[], minRating: number): IGame[] {
  return games.filter((game: IGame) => game.rating >= minRating);
}

export function sortGamesByPopularity(games: IGame[]): IGame[] {
  return [...games].sort((a: IGame, b: IGame) => b.playCount - a.playCount);
}
