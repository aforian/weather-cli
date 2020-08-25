#!/usr/bin/env node

import chalk from 'chalk';
import { program } from 'commander';

import pkg from '../package.json';
import getWeather from './commander/weather';

program.version(`${chalk.blue.bold`Easy`} ${chalk.green.bold`Weather`} version: ${pkg.version}`);

program
  .option('-p, --place <place>', 'Weather at specific place')
  .option('-d, --date <date>', 'Weather at specific date')
  .action(option => {
    getWeather(option);
  });

program.command('*').action(command => {
  console.log(chalk.red.bold(`Unknown command: ${command.args.join(' ')}`));

  process.exit(1);
});

program.parse(process.argv);
