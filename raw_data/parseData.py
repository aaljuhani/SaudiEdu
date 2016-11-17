import xlrd
import csv
import io
from xlutils.copy import copy # http://pypi.python.org/pypi/xlutils

# MAJORS = [u'\u0627\u0644\u0628\u0631\u0627\u0645\u062c \u0627\u0644\u0631\u0626\u064a\u0633\u0629', u'\u0627\u0644\u062f\u0631\u0627\u0633\u0627\u062a \u0627\u0644\u0625\u0633\u0644\u0627\u0645\u064a\u0629', u'\u062a\u062f\u0631\u064a\u0628 \u0645\u0639\u0644\u0645\u064a\u0646', u'\u0639\u0644\u0648\u0645 \u0627\u0644\u062a\u0631\u0628\u064a\u0629', u'\u0627\u0644\u0641\u0646\u0648\u0646', u'\u0627\u0644\u062f\u0631\u0627\u0633\u0627\u062a \u0627\u0644\u0625\u0646\u0633\u0627\u0646\u064a\u0629', u'\u0627\u0644\u0639\u0644\u0648\u0645 \u0627\u0644\u0627\u062c\u062a\u0645\u0627\u0639\u064a\u0629 \u0648\u0627\u0644\u0633\u0644\u0648\u0643\u064a\u0629', u'\u0627\u0644\u0635\u062d\u0627\u0641\u0629 \u0648\u0627\u0644\u0625\u0639\u0644\u0627\u0645', u'\u0627\u0644\u0623\u0639\u0645\u0627\u0644 \u0627\u0644\u062a\u062c\u0627\u0631\u064a\u0629 \u0648\u0627\u0644\u0625\u062f\u0627\u0631\u0629', u'\u0627\u0644\u0642\u0627\u0646\u0648\u0646', u'\u0639\u0644\u0648\u0645 \u0627\u0644\u062d\u064a\u0627\u0629', u'\u0627\u0644\u0639\u0644\u0648\u0645 \u0627\u0644\u0641\u064a\u0632\u064a\u0627\u0626\u064a\u0629', u'\u0627\u0644\u0631\u064a\u0627\u0636\u064a\u0627\u062a \u0648\u0627\u0644\u0625\u062d\u0635\u0627\u0621', u'\u0627\u0644\u0645\u0639\u0644\u0648\u0645\u0627\u062a\u064a\u0629', u'\u0627\u0644\u0647\u0646\u062f\u0633\u0629 \u0648\u0627\u0644\u0635\u0646\u0627\u0639\u0627\u062a \u0627\u0644\u0647\u0646\u062f\u0633\u064a\u0629', u'\u0627\u0644\u0635\u0646\u0627\u0639\u0627\u062a \u0627\u0644\u0625\u0646\u062a\u0627\u062c\u064a\u0629 \u0648\u0627\u0644\u062a\u062d\u0648\u064a\u0644\u064a\u0629', u'\u0627\u0644\u0647\u0646\u062f\u0633\u0629 \u0627\u0644\u0645\u0639\u0645\u0627\u0631\u064a\u0629 \u0648\u0627\u0644\u0628\u0646\u0627\u0621', u'\u0627\u0644\u0632\u0631\u0627\u0639\u0629 \u0648\u0627\u0644\u062d\u0631\u0627\u062c\u0629 \u0648\u0635\u064a\u062f \u0627\u0644\u0623\u0633\u0645\u0627\u0643', u'\u0627\u0644\u0637\u0628 \u0627\u0644\u0628\u064a\u0637\u0631\u064a', u'\u0627\u0644\u0635\u062d\u0629', u'\u0627\u0644\u062e\u062f\u0645\u0627\u062a \u0627\u0644\u0627\u062c\u062a\u0645\u0627\u0639\u064a\u0629', u'\u0627\u0644\u062e\u062f\u0645\u0627\u062a \u0627\u0644\u0634\u062e\u0635\u064a\u0629', u'\u062e\u062f\u0645\u0627\u062a \u0627\u0644\u0646\u0642\u0644', u'\u062d\u0645\u0627\u064a\u0629 \u0627\u0644\u0628\u064a\u0626\u0629', u'\u0623\u062e\u0631\u0649', u'\u0625\u062c\u0645\u0627\u0644\u064a \u0645\u0624\u0633\u0633\u0627\u062a \u0627\u0644\u062a\u0639\u0644\u064a\u0645 \u0627\u0644\u0639\u0627\u0644\u064a \u0641\u064a \u0627\u0644\u0645\u0645\u0644\u0643\u0629']


print('hello world')

# Global parameters
HIJRI = 1426
YEAR = 2005
FILE = 'years/1426-1427.xls'
BOOK = ''

# files that has undergrad and grad data in one sheet
SHEET = '4-2'
STARTROW = 81

# files that has undergrad and grad data in two sheets
U_SHEET = '4-4'
USTARTROW = 4
G_SHEET = '4-6'
GSTARTROW = 4

# files that has abroad students

def parse_sheet():
    """
    Open and read an Excel file
    This works for the last two years 2013 - 2014
    where
    """

    # get the data worksheet
    data_sheet = BOOK.sheet_by_name(SHEET)

    print data_sheet.nrows
    print data_sheet.ncols

    # getting values
    val = []
    majors = []
    for row in range(81,data_sheet.nrows):
        # header
        h = "" + data_sheet.cell_value(row, 1).encode('utf8')
        print h
        # Male undergrad
        mu = data_sheet.cell_value(row, 5)
        val.append([YEAR,HIJRI,h,'male','undergrad', 'local', mu])
        # Male grad
        mg = data_sheet.cell_value(row, 8)
        val.append([YEAR,HIJRI,h,'male','grad', 'local', mg])

        # Female undergrad
        fu = data_sheet.cell_value(row, 6)
        val.append([YEAR,HIJRI,h,'female','undergrad', 'local', fu])

        # Female grad
        fg = data_sheet.cell_value(row, 9)
        val.append([YEAR,HIJRI,h,'female','grad', 'local', fg])


    #print val
    print len(val)

    write_data(val)

def parse_ugsheet():
    """
    parsing data from files in which undergrad and grad data are in separate sheets
    :param path:
    :param usheet:
    :param gsheet:
    :return:
    """

    u_sheet = BOOK.sheet_by_name(U_SHEET)
    g_sheet = BOOK.sheet_by_name(G_SHEET)

    val = []
    #undergrade data has the following order [um, uf, um , uf ..... etc]
    #undergrad_data = []
    h = ""
    for row in range(USTARTROW,u_sheet.nrows):
        # h =  u_sheet.cell_value(row, 1)
        if(u_sheet.cell_value(row, 1) != ""):
            h =  "" + u_sheet.cell_value(row, 1).encode('utf8')
            print h

        jumlah = u_sheet.cell_value(row, 2)
        if(jumlah == u'\u062c\u0645\u0644\u0629'):
            #undergrad_data.append(u_sheet.cell_value(row, 3))
            #undergrad_data.append(u_sheet.cell_value(row, 4))
            val.append([YEAR,HIJRI,h,'male','undergrad', 'local', u_sheet.cell_value(row, 3)])
            val.append([YEAR,HIJRI,h,'female','undergrad', 'local', u_sheet.cell_value(row, 4)])

    #print undergrad_data
    #print len(undergrad_data)

    #grad_data = []
    h = ""
    for row in range(GSTARTROW,g_sheet.nrows):
        #h =  g_sheet.cell_value(row, 1)

        if(g_sheet.cell_value(row, 1) != ""):
            h =  "" + g_sheet.cell_value(row, 1).encode('utf8')
            print h

        jumlah = g_sheet.cell_value(row, 2)
        if(jumlah == u'\u062c\u0645\u0644\u0629'):
            #grad_data.append(g_sheet.cell_value(row, 3))
            #grad_data.append(g_sheet.cell_value(row, 4))
            val.append([YEAR,HIJRI,h,'male','grad', 'local', g_sheet.cell_value(row, 3)])
            val.append([YEAR,HIJRI,h,'female','grad', 'local', g_sheet.cell_value(row, 4)])

    #print grad_data
    #print len(grad_data)

    #data = []
    #for i in range(0, len(grad_data), 2):
        # mu
       # data.append(undergrad_data[i])
        # mg
       # data.append(grad_data[i])
        # fu
       # data.append(undergrad_data[i+1])
        # fg
       # data.append(grad_data[i+1])

    print val
    print len(val)

    write_data(val)


def parse_ugshee_style2():
    """
    parsing data from files in which undergrad and grad data are in separate sheets
    :param path:
    :param usheet:
    :param gsheet:
    :return:
    """

    u_sheet = BOOK.sheet_by_name(U_SHEET)
    g_sheet = BOOK.sheet_by_name(G_SHEET)

    val = []
    #undergrade data has the following order [um, uf, um , uf ..... etc]
    #undergrad_data = []
    h = ""
    for row in range(USTARTROW,u_sheet.nrows):
        # h =  u_sheet.cell_value(row, 1)
        if(u_sheet.cell_value(row, 10) != ""):
            h =  "" + u_sheet.cell_value(row, 10).encode('utf8')
            print h

        jumlah = u_sheet.cell_value(row, 9)
        if(jumlah.strip() == u'\u062c\u0645\u0644\u0629'):
            #undergrad_data.append(u_sheet.cell_value(row, 3))
            #undergrad_data.append(u_sheet.cell_value(row, 4))
            val.append([YEAR,HIJRI,h,'male','undergrad', 'local', u_sheet.cell_value(row, 8)])
            val.append([YEAR,HIJRI,h,'female','undergrad', 'local', u_sheet.cell_value(row, 7)])

    #print undergrad_data
    #print len(undergrad_data)

    #grad_data = []
    h = ""
    mPhD = 0
    fPhD = 0
    for row in range(GSTARTROW,g_sheet.nrows):
        #h =  g_sheet.cell_value(row, 1)

        if(g_sheet.cell_value(row, 10) != ""):
            h =  "" + g_sheet.cell_value(row, 10).encode('utf8')
            print h

        level = g_sheet.cell_value(row, 9).strip()
        print 'l'
        print level

        if(level == u'\u062F\u0643\u062A\u0648\u0631\u0627\u0647'):
            print ' inside phd'
            mPhD = g_sheet.cell_value(row, 8)
            fPhD = g_sheet.cell_value(row, 7)
        elif (level == u'\u0645\u0627\u062C\u0633\u062A\u064A\u0631'):
            #grad_data.append(g_sheet.cell_value(row, 3))
            #grad_data.append(g_sheet.cell_value(row, 4))
            val.append([YEAR,HIJRI,h,'male','grad', 'local', g_sheet.cell_value(row, 8)+ mPhD ])
            val.append([YEAR,HIJRI,h,'female','grad', 'local', g_sheet.cell_value(row, 7)+ fPhD ])

    #print grad_data
    #print len(grad_data)

    #data = []
    #for i in range(0, len(grad_data), 2):
        # mu
       # data.append(undergrad_data[i])
        # mg
       # data.append(grad_data[i])
        # fu
       # data.append(undergrad_data[i+1])
        # fg
       # data.append(grad_data[i+1])

    print val
    print len(val)

    write_data(val)



def write_data(list):
    """
    add data to the collective data file
    """
    with open('agg_data.csv', 'a') as csvfile:
        writer = csv.writer(csvfile)
        writer.writerows(list)


def write_header(path, sheet):
    header = ['hijri', 'year']

    book = xlrd.open_workbook(path)

    # get the data worksheet
    data_sheet = book.sheet_by_name(sheet)

    print data_sheet.nrows
    print data_sheet.ncols

    for row in range(408,data_sheet.nrows):
        # header
        h =  data_sheet.cell_value(row, 13)
        if(h != ''):
            header.append(h.replace(" ", "_")+'_m_u')
            header.append(h.replace(" ", "_")+'_m_g')
            header.append(h.replace(" ", "_")+'_f_u')
            header.append(h.replace(" ", "_")+'_f_g')
            print h

    print header
    print len(header)

    with open('header_data.csv', 'a') as csvfile:
        writer = csv.DictWriter(csvfile, fieldnames = header, delimiter = ',')
        writer.writeheader()

# ----------------------------------------------------------------------
if __name__ == "__main__":
    BOOK = xlrd.open_workbook(FILE)
    #write_header(path, sheet)

    #parse_sheet()
    #parse_ugsheet()
    parse_ugshee_style2()
