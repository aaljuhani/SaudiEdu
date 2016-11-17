import xlrd
import csv
import io

file = open('test1.csv')
csv_f = csv.reader(file)

for row in csv_f:
    for r in row:
        print r