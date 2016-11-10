import xlrd
import csv
from xlutils.copy import copy # http://pypi.python.org/pypi/xlutils

# MAJORS = [u'\u0627\u0644\u0628\u0631\u0627\u0645\u062c \u0627\u0644\u0631\u0626\u064a\u0633\u0629', u'\u0627\u0644\u062f\u0631\u0627\u0633\u0627\u062a \u0627\u0644\u0625\u0633\u0644\u0627\u0645\u064a\u0629', u'\u062a\u062f\u0631\u064a\u0628 \u0645\u0639\u0644\u0645\u064a\u0646', u'\u0639\u0644\u0648\u0645 \u0627\u0644\u062a\u0631\u0628\u064a\u0629', u'\u0627\u0644\u0641\u0646\u0648\u0646', u'\u0627\u0644\u062f\u0631\u0627\u0633\u0627\u062a \u0627\u0644\u0625\u0646\u0633\u0627\u0646\u064a\u0629', u'\u0627\u0644\u0639\u0644\u0648\u0645 \u0627\u0644\u0627\u062c\u062a\u0645\u0627\u0639\u064a\u0629 \u0648\u0627\u0644\u0633\u0644\u0648\u0643\u064a\u0629', u'\u0627\u0644\u0635\u062d\u0627\u0641\u0629 \u0648\u0627\u0644\u0625\u0639\u0644\u0627\u0645', u'\u0627\u0644\u0623\u0639\u0645\u0627\u0644 \u0627\u0644\u062a\u062c\u0627\u0631\u064a\u0629 \u0648\u0627\u0644\u0625\u062f\u0627\u0631\u0629', u'\u0627\u0644\u0642\u0627\u0646\u0648\u0646', u'\u0639\u0644\u0648\u0645 \u0627\u0644\u062d\u064a\u0627\u0629', u'\u0627\u0644\u0639\u0644\u0648\u0645 \u0627\u0644\u0641\u064a\u0632\u064a\u0627\u0626\u064a\u0629', u'\u0627\u0644\u0631\u064a\u0627\u0636\u064a\u0627\u062a \u0648\u0627\u0644\u0625\u062d\u0635\u0627\u0621', u'\u0627\u0644\u0645\u0639\u0644\u0648\u0645\u0627\u062a\u064a\u0629', u'\u0627\u0644\u0647\u0646\u062f\u0633\u0629 \u0648\u0627\u0644\u0635\u0646\u0627\u0639\u0627\u062a \u0627\u0644\u0647\u0646\u062f\u0633\u064a\u0629', u'\u0627\u0644\u0635\u0646\u0627\u0639\u0627\u062a \u0627\u0644\u0625\u0646\u062a\u0627\u062c\u064a\u0629 \u0648\u0627\u0644\u062a\u062d\u0648\u064a\u0644\u064a\u0629', u'\u0627\u0644\u0647\u0646\u062f\u0633\u0629 \u0627\u0644\u0645\u0639\u0645\u0627\u0631\u064a\u0629 \u0648\u0627\u0644\u0628\u0646\u0627\u0621', u'\u0627\u0644\u0632\u0631\u0627\u0639\u0629 \u0648\u0627\u0644\u062d\u0631\u0627\u062c\u0629 \u0648\u0635\u064a\u062f \u0627\u0644\u0623\u0633\u0645\u0627\u0643', u'\u0627\u0644\u0637\u0628 \u0627\u0644\u0628\u064a\u0637\u0631\u064a', u'\u0627\u0644\u0635\u062d\u0629', u'\u0627\u0644\u062e\u062f\u0645\u0627\u062a \u0627\u0644\u0627\u062c\u062a\u0645\u0627\u0639\u064a\u0629', u'\u0627\u0644\u062e\u062f\u0645\u0627\u062a \u0627\u0644\u0634\u062e\u0635\u064a\u0629', u'\u062e\u062f\u0645\u0627\u062a \u0627\u0644\u0646\u0642\u0644', u'\u062d\u0645\u0627\u064a\u0629 \u0627\u0644\u0628\u064a\u0626\u0629', u'\u0623\u062e\u0631\u0649', u'\u0625\u062c\u0645\u0627\u0644\u064a \u0645\u0624\u0633\u0633\u0627\u062a \u0627\u0644\u062a\u0639\u0644\u064a\u0645 \u0627\u0644\u0639\u0627\u0644\u064a \u0641\u064a \u0627\u0644\u0645\u0645\u0644\u0643\u0629']


print('hello world')
HIJRI = 1435
YEAR = 2014
FILE = 'years/1435-1436/grads.xlsx'
SHEET = '4-2'

def parse_file(path, sheet):
    """
    Open and read an Excel file
    """
    book = xlrd.open_workbook(path)

    # get the data worksheet
    data_sheet = book.sheet_by_name(sheet)

    print data_sheet.nrows
    print data_sheet.ncols

    # getting values
    val = [HIJRI , YEAR]
    majors = []
    for row in range(81,data_sheet.nrows):
        # header
        h =  data_sheet.cell_value(row, 1)
        majors.append(h)
        print h
        # Male undergrad
        mu = data_sheet.cell_value(row, 5)
        val.append(mu)
        # Male grad
        mg = data_sheet.cell_value(row, 8)
        val.append(mg)

        # Female undergrad
        fu = data_sheet.cell_value(row, 6)
        val.append(fu)

        # Female grad
        fg = data_sheet.cell_value(row, 9)
        val.append(fg)


    print val
    print len(val)

    #write_data(val)



def write_data (list):
    """
    add data to the collective data file
    """
    with open('collective_data.csv', 'a') as csvfile:
        writer = csv.DictWriter(csvfile, fieldnames = list, delimiter = ',')
        writer.writeheader()


def write_header(path, sheet):
    header = ['hijri', 'year']

    book = xlrd.open_workbook(path)

    # get the data worksheet
    data_sheet = book.sheet_by_name(sheet)

    print data_sheet.nrows
    print data_sheet.ncols

    for row in range(81,data_sheet.nrows):
        # header
        h =  data_sheet.cell_value(row, 1)
        header.append(h)



    with open('header_data.csv', 'wb') as csvfile:
        writer = csv.DictWriter(csvfile, fieldnames = header, delimiter = ',')
        writer.writeheader()

# ----------------------------------------------------------------------
if __name__ == "__main__":
    path = FILE
    sheet = SHEET
    #write_header(path, sheet)

    parse_file(path, sheet)
