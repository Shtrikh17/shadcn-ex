#!/bin/bash
npm run build --prefix shadcn-ex
cd shadcn-ex-test && npm i --save ../shadcn-ex