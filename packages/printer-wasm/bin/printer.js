#!/usr/bin/env node
import process from 'node:process';
import {readStdin} from 'redstd';
import {print} from '#printer-wasm';

const {stdout} = process;
const source = await readStdin();

stdout.write(print(source));
