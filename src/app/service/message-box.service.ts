import { Injectable } from '@angular/core';

@Injectable()
export class MessageBoxService {
  messages: string[] = [
    'Спасибо!',
    'Недостаточно средств',
    'Извините, недостаточно монет для выдачи сдачи в полном объёме'];
  constructor() { }

  getMessages(): string[] {
    return this.messages;
  }
}
