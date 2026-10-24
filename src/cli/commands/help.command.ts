import { Command } from './command.interface.js';
import chalk from 'chalk';

export class HelpCommand implements Command {
  public getName(): string {
    return '--help';
  }

  public async execute(..._parameters: string[]): Promise<void> {
    console.info(`
      ${chalk.bgMagenta('Программа для подготовки данных для REST API сервера.')}

      Пример: cli.js --<command> [--arguments]

      ${chalk.magentaBright('Команды:')}

       --version:                   ${chalk.green('# выводит номер версии')}
       --help:                      ${chalk.green('# печатает этот текст')}
       --import <path>:             ${chalk.green('# импортирует данные из TSV')}
       ${chalk.dim('--generate <n> <path> <url>  # пока не реализовано')}
    `);
  }
}
