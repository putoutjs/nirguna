#!/usr/bin/env node

import process from 'node:process';
import {readStdin} from 'redstd';
import {parse} from '#parser-wasm';

const {stdout} = process;
const source = await readStdin();

stdout.write(parse(source));
