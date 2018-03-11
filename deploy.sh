#!/bin/bash
set -x #echo on

ng build --prod --aot 
rsync -a /var/lib/jenkins/workspace/budget-api-pipeline/dist /var/www/budget-web/
