import xlrd
import csv
import io
from xlutils.copy import copy # http://pypi.python.org/pypi/xlutils

# MAJORS = [u'\u0627\u0644\u0628\u0631\u0627\u0645\u062c \u0627\u0644\u0631\u0626\u064a\u0633\u0629', u'\u0627\u0644\u062f\u0631\u0627\u0633\u0627\u062a \u0627\u0644\u0625\u0633\u0644\u0627\u0645\u064a\u0629', u'\u062a\u062f\u0631\u064a\u0628 \u0645\u0639\u0644\u0645\u064a\u0646', u'\u0639\u0644\u0648\u0645 \u0627\u0644\u062a\u0631\u0628\u064a\u0629', u'\u0627\u0644\u0641\u0646\u0648\u0646', u'\u0627\u0644\u062f\u0631\u0627\u0633\u0627\u062a \u0627\u0644\u0625\u0646\u0633\u0627\u0646\u064a\u0629', u'\u0627\u0644\u0639\u0644\u0648\u0645 \u0627\u0644\u0627\u062c\u062a\u0645\u0627\u0639\u064a\u0629 \u0648\u0627\u0644\u0633\u0644\u0648\u0643\u064a\u0629', u'\u0627\u0644\u0635\u062d\u0627\u0641\u0629 \u0648\u0627\u0644\u0625\u0639\u0644\u0627\u0645', u'\u0627\u0644\u0623\u0639\u0645\u0627\u0644 \u0627\u0644\u062a\u062c\u0627\u0631\u064a\u0629 \u0648\u0627\u0644\u0625\u062f\u0627\u0631\u0629', u'\u0627\u0644\u0642\u0627\u0646\u0648\u0646', u'\u0639\u0644\u0648\u0645 \u0627\u0644\u062d\u064a\u0627\u0629', u'\u0627\u0644\u0639\u0644\u0648\u0645 \u0627\u0644\u0641\u064a\u0632\u064a\u0627\u0626\u064a\u0629', u'\u0627\u0644\u0631\u064a\u0627\u0636\u064a\u0627\u062a \u0648\u0627\u0644\u0625\u062d\u0635\u0627\u0621', u'\u0627\u0644\u0645\u0639\u0644\u0648\u0645\u0627\u062a\u064a\u0629', u'\u0627\u0644\u0647\u0646\u062f\u0633\u0629 \u0648\u0627\u0644\u0635\u0646\u0627\u0639\u0627\u062a \u0627\u0644\u0647\u0646\u062f\u0633\u064a\u0629', u'\u0627\u0644\u0635\u0646\u0627\u0639\u0627\u062a \u0627\u0644\u0625\u0646\u062a\u0627\u062c\u064a\u0629 \u0648\u0627\u0644\u062a\u062d\u0648\u064a\u0644\u064a\u0629', u'\u0627\u0644\u0647\u0646\u062f\u0633\u0629 \u0627\u0644\u0645\u0639\u0645\u0627\u0631\u064a\u0629 \u0648\u0627\u0644\u0628\u0646\u0627\u0621', u'\u0627\u0644\u0632\u0631\u0627\u0639\u0629 \u0648\u0627\u0644\u062d\u0631\u0627\u062c\u0629 \u0648\u0635\u064a\u062f \u0627\u0644\u0623\u0633\u0645\u0627\u0643', u'\u0627\u0644\u0637\u0628 \u0627\u0644\u0628\u064a\u0637\u0631\u064a', u'\u0627\u0644\u0635\u062d\u0629', u'\u0627\u0644\u062e\u062f\u0645\u0627\u062a \u0627\u0644\u0627\u062c\u062a\u0645\u0627\u0639\u064a\u0629', u'\u0627\u0644\u062e\u062f\u0645\u0627\u062a \u0627\u0644\u0634\u062e\u0635\u064a\u0629', u'\u062e\u062f\u0645\u0627\u062a \u0627\u0644\u0646\u0642\u0644', u'\u062d\u0645\u0627\u064a\u0629 \u0627\u0644\u0628\u064a\u0626\u0629', u'\u0623\u062e\u0631\u0649', u'\u0625\u062c\u0645\u0627\u0644\u064a \u0645\u0624\u0633\u0633\u0627\u062a \u0627\u0644\u062a\u0639\u0644\u064a\u0645 \u0627\u0644\u0639\u0627\u0644\u064a \u0641\u064a \u0627\u0644\u0645\u0645\u0644\u0643\u0629']
ENG_SUBJECT = ['', u' Basic Programs', u' Basic Programs', u'Islamic Studies', u'Teachers Training', u'Education', u'Arts', u'Humanities', u'Social and Behavioral Sciences', u'Journalism and Media',u'Journalism and Media', u'Business and Management', u'Law', u'Life Sciences', u'Physical Sciences', u'Mathematics and Statistics', u'Information Technology', u'Engineering and Engeneering Trades', u'Manufacturing and Processing', u'Architecture and Construction', u'Agriculture, Forestry and Fishery', u'  Veterinary Medicine', u'Health', u'Social Services', u'Personal Services', u'Transport Services', u'Environmental Protection', u'Other',u'Health', u'Total Education Institutes', u'Total Education Institutes',u'Transport Services', u'Security Services', u'Total Education Institutes', u'Total Education Institutes', u'Total Education Institutes', u'Total Education Institutes']
ARB_SUBJECT = ['', '\xd8\xa7\xd9\x84\xd8\xa8\xd8\xb1\xd8\xa7\xd9\x85\xd8\xac \xd8\xa7\xd9\x84\xd8\xb1\xd8\xa6\xd9\x8a\xd8\xb3\xd8\xa9', '\xd8\xa7\xd9\x84\xd8\xa8\xd8\xb1\xd8\xa7\xd9\x85\xd8\xac \xd8\xa7\xd9\x84\xd8\xb1\xd8\xa6\xd9\x8a\xd8\xb3\xd9\x8a\xd8\xa9', '\xd8\xa7\xd9\x84\xd8\xaf\xd8\xb1\xd8\xa7\xd8\xb3\xd8\xa7\xd8\xaa \xd8\xa7\xd9\x84\xd8\xa5\xd8\xb3\xd9\x84\xd8\xa7\xd9\x85\xd9\x8a\xd8\xa9', '\xd8\xaa\xd8\xaf\xd8\xb1\xd9\x8a\xd8\xa8 \xd9\x85\xd8\xb9\xd9\x84\xd9\x85\xd9\x8a\xd9\x86', '\xd8\xb9\xd9\x84\xd9\x88\xd9\x85 \xd8\xa7\xd9\x84\xd8\xaa\xd8\xb1\xd8\xa8\xd9\x8a\xd8\xa9', '\xd8\xa7\xd9\x84\xd9\x81\xd9\x86\xd9\x88\xd9\x86', '\xd8\xa7\xd9\x84\xd8\xaf\xd8\xb1\xd8\xa7\xd8\xb3\xd8\xa7\xd8\xaa \xd8\xa7\xd9\x84\xd8\xa5\xd9\x86\xd8\xb3\xd8\xa7\xd9\x86\xd9\x8a\xd8\xa9', '\xd8\xa7\xd9\x84\xd8\xb9\xd9\x84\xd9\x88\xd9\x85 \xd8\xa7\xd9\x84\xd8\xa7\xd8\xac\xd8\xaa\xd9\x85\xd8\xa7\xd8\xb9\xd9\x8a\xd8\xa9 \xd9\x88\xd8\xa7\xd9\x84\xd8\xb3\xd9\x84\xd9\x88\xd9\x83\xd9\x8a\xd8\xa9','\xd8\xa7\xd9\x84\xd8\xb5\xd8\xad\xd8\xa7\xd9\x81\xd8\xa9 \xd9\x88\xd8\xa7\xd9\x84\xd8\xa5\xd8\xb9\xd9\x84\xd8\xa7\xd9\x85' , '\xd8\xa7\xd9\x84\xd8\xb5\xd8\xad\xd8\xa7\xd9\x81\xd8\xa9 \xd9\x88\xd8\xa7\xd9\x84\xd8\xa7\xd8\xb9\xd9\x84\xd8\xa7\xd9\x85', '\xd8\xa7\xd9\x84\xd8\xa3\xd8\xb9\xd9\x85\xd8\xa7\xd9\x84 \xd8\xa7\xd9\x84\xd8\xaa\xd8\xac\xd8\xa7\xd8\xb1\xd9\x8a\xd8\xa9 \xd9\x88\xd8\xa7\xd9\x84\xd8\xa5\xd8\xaf\xd8\xa7\xd8\xb1\xd8\xa9', '\xd8\xa7\xd9\x84\xd9\x82\xd8\xa7\xd9\x86\xd9\x88\xd9\x86', '\xd8\xb9\xd9\x84\xd9\x88\xd9\x85 \xd8\xa7\xd9\x84\xd8\xad\xd9\x8a\xd8\xa7\xd8\xa9', '\xd8\xa7\xd9\x84\xd8\xb9\xd9\x84\xd9\x88\xd9\x85 \xd8\xa7\xd9\x84\xd9\x81\xd9\x8a\xd8\xb2\xd9\x8a\xd8\xa7\xd8\xa6\xd9\x8a\xd8\xa9', '\xd8\xa7\xd9\x84\xd8\xb1\xd9\x8a\xd8\xa7\xd8\xb6\xd9\x8a\xd8\xa7\xd8\xaa \xd9\x88\xd8\xa7\xd9\x84\xd8\xa5\xd8\xad\xd8\xb5\xd8\xa7\xd8\xa1', '\xd8\xa7\xd9\x84\xd9\x85\xd8\xb9\xd9\x84\xd9\x88\xd9\x85\xd8\xa7\xd8\xaa\xd9\x8a\xd8\xa9', '\xd8\xa7\xd9\x84\xd9\x87\xd9\x86\xd8\xaf\xd8\xb3\xd8\xa9 \xd9\x88\xd8\xa7\xd9\x84\xd8\xb5\xd9\x86\xd8\xa7\xd8\xb9\xd8\xa7\xd8\xaa \xd8\xa7\xd9\x84\xd9\x87\xd9\x86\xd8\xaf\xd8\xb3\xd9\x8a\xd8\xa9', '\xd8\xa7\xd9\x84\xd8\xb5\xd9\x86\xd8\xa7\xd8\xb9\xd8\xa7\xd8\xaa \xd8\xa7\xd9\x84\xd8\xa5\xd9\x86\xd8\xaa\xd8\xa7\xd8\xac\xd9\x8a\xd8\xa9 \xd9\x88\xd8\xa7\xd9\x84\xd8\xaa\xd8\xad\xd9\x88\xd9\x8a\xd9\x84\xd9\x8a\xd8\xa9', '\xd8\xa7\xd9\x84\xd9\x87\xd9\x86\xd8\xaf\xd8\xb3\xd8\xa9 \xd8\xa7\xd9\x84\xd9\x85\xd8\xb9\xd9\x85\xd8\xa7\xd8\xb1\xd9\x8a\xd8\xa9 \xd9\x88\xd8\xa7\xd9\x84\xd8\xa8\xd9\x86\xd8\xa7\xd8\xa1', '\xd8\xa7\xd9\x84\xd8\xb2\xd8\xb1\xd8\xa7\xd8\xb9\xd8\xa9 \xd9\x88\xd8\xa7\xd9\x84\xd8\xad\xd8\xb1\xd8\xa7\xd8\xac\xd8\xa9 \xd9\x88\xd8\xb5\xd9\x8a\xd8\xaf \xd8\xa7\xd9\x84\xd8\xa3\xd8\xb3\xd9\x85\xd8\xa7\xd9\x83', '\xd8\xa7\xd9\x84\xd8\xb7\xd8\xa8 \xd8\xa7\xd9\x84\xd8\xa8\xd9\x8a\xd8\xb7\xd8\xb1\xd9\x8a', '\xd8\xa7\xd9\x84\xd8\xb5\xd8\xad\xd8\xa9 ', '\xd8\xa7\xd9\x84\xd8\xae\xd8\xaf\xd9\x85\xd8\xa7\xd8\xaa \xd8\xa7\xd9\x84\xd8\xa7\xd8\xac\xd8\xaa\xd9\x85\xd8\xa7\xd8\xb9\xd9\x8a\xd8\xa9', '\xd8\xa7\xd9\x84\xd8\xae\xd8\xaf\xd9\x85\xd8\xa7\xd8\xaa \xd8\xa7\xd9\x84\xd8\xb4\xd8\xae\xd8\xb5\xd9\x8a\xd8\xa9', '\xd8\xae\xd8\xaf\xd9\x85\xd8\xa7\xd8\xaa \xd8\xa7\xd9\x84\xd9\x86\xd9\x82\xd9\x84', '\xd8\xad\xd9\x85\xd8\xa7\xd9\x8a\xd8\xa9 \xd8\xa7\xd9\x84\xd8\xa8\xd9\x8a\xd8\xa6\xd8\xa9', '\xd8\xa3\xd8\xae\xd8\xb1\xd9\x89','\xd8\xa7\xd9\x84\xd8\xb5\xd8\xad\xd8\xa9', '\xd8\xa5\xd8\xac\xd9\x85\xd8\xa7\xd9\x84\xd9\x8a \xd9\x85\xd8\xa4\xd8\xb3\xd8\xb3\xd8\xa7\xd8\xaa \xd8\xa7\xd9\x84\xd8\xaa\xd8\xb9\xd9\x84\xd9\x8a\xd9\x85 \xd8\xa7\xd9\x84\xd8\xb9\xd8\xa7\xd9\x84\xd9\x8a \xd9\x81\xd9\x8a \xd8\xa7\xd9\x84\xd9\x85\xd9\x85\xd9\x84\xd9\x83\xd8\xa9','\xd8\xa5\xd8\xac\xd9\x85\xd8\xa7\xd9\x84\xd9\x8a \xd8\xa5\xd8\xac\xd9\x85\xd8\xa7\xd9\x84\xd9\x8a \xd9\x85\xd8\xa4\xd8\xb3\xd8\xb3\xd8\xa7\xd8\xaa \xd8\xa7\xd9\x84\xd8\xaa\xd8\xb9\xd9\x84\xd9\x8a\xd9\x85 \xd8\xa7\xd9\x84\xd8\xb9\xd8\xa7\xd9\x84\xd9\x8a \xd9\x81\xd9\x8a \xd8\xa7\xd9\x84\xd9\x85\xd9\x85\xd9\x84\xd9\x83\xd8\xa9', '\xd8\xae\xd8\xaf\xd9\x85\xd8\xa7\xd8\xaa \xd8\xa7\xd9\x84\xd9\x86\xd9\x82\xd9\x84 ', '\xd8\xa7\xd9\x84\xd8\xae\xd8\xaf\xd9\x85\xd8\xa7\xd8\xaa \xd8\xa7\xd9\x84\xd8\xa3\xd9\x85\xd9\x86\xd9\x8a\xd8\xa9', '\xd8\xa7\xd9\x84\xd8\xa5\xd8\xac\xd9\x85\xd8\xa7\xd9\x84\xd9\x8a \xd8\xa7\xd9\x84\xd9\x83\xd9\x84\xd9\x8a', '\xd8\xa5\xd8\xac\xd9\x85\xd8\xa7\xd9\x84\xd9\x8a \xd9\x85\xd8\xa4\xd8\xb3\xd8\xb3\xd8\xa7\xd8\xaa \xd8\xa7\xd9\x84\xd8\xaa\xd8\xb9\xd9\x84\xd9\x8a\xd9\x85 \xd8\xa7\xd9\x84\xd8\xb9\xd8\xa7\xd9\x84\xd9\x8a \xd9\x81\xd9\x8a \xd8\xa7\xd9\x84\xd9\x85\xd9\x85\xd9\x84\xd9\x83\xd8\xa9 ', '\xd8\xa5\xd8\xac\xd9\x85\xd8\xa7\xd9\x84\xd9\x8a \xd9\x85\xd8\xa4\xd8\xb3\xd8\xb3\xd8\xa7\xd8\xaa \xd8\xa7\xd9\x84\xd8\xaa\xd8\xb9\xd9\x84\xd9\x8a\xd9\x85 \xd8\xa7\xd9\x84\xd8\xb9\xd8\xa7\xd9\x84\xd9\x8a ', '\xd8\xa5\xd8\xac\xd9\x85\xd8\xa7\xd9\x84\xd9\x8a \xd9\x85\xd8\xa4\xd8\xb3\xd8\xb3\xd8\xa7\xd8\xaa \xd8\xa7\xd9\x84\xd8\xaa\xd8\xb9\xd9\x84\xd9\x8a\xd9\x85 \xd8\xa7\xd9\x84\xd8\xb9\xd8\xa7\xd9\x84\xd9\x8a']

print('hello world')

# Global parameters
HIJRI = 1430
YEAR = 2009
FILE = 'years/1431-1430.xls'
AFILE = 'years/1432-1431.xls'
BOOK = ''

# files that has undergrad and grad data in one sheet
SHEET = '4-2'
STARTROW = 82

# abroad sheet
ABROAD_SHEET = '9-2'

# files that has undergrad and grad data in two sheets
D_SHEET = '4-2'
DSTARTROW = 3
U_SHEET = '4-4'
USTARTROW = 3
G_SHEET = '4-6'
GSTARTROW = 3

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
        '''
        #h = "" + data_sheet.cell_value(row, 1).encode('utf8')

        print data_sheet.cell_value(row, 1)
        '''
        h = "" + data_sheet.cell_value(row, 1).encode('utf8')
        subject = "" + data_sheet.cell_value(row, 1).encode('utf8')
        if (ARB_SUBJECT.index(subject) > -1):
            h = ENG_SUBJECT[ARB_SUBJECT.index(subject)]

        print data_sheet.cell_value(row, 1)
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

        #diploma
        md = data_sheet.cell_value(row, 2)
        val.append([YEAR,HIJRI,h,'male','diploma', 'local', md])

        fd= data_sheet.cell_value(row, 3)
        val.append([YEAR,HIJRI,h,'female','diploma', 'local', fd])


    print val
    print len(val)

    write_data(val)

def parse_abraod_sheet():
    # get the data worksheet
    data_sheet = ABOOK.sheet_by_name(ABROAD_SHEET)
    # getting values
    val = []

    for row in range(5,data_sheet.nrows,3):
        # header
        h = "" + data_sheet.cell_value(row, 1).encode('utf8')
        subject = "" + data_sheet.cell_value(row, 1).encode('utf8')
        if (ARB_SUBJECT.index(subject) > -1):
            h = ENG_SUBJECT[ARB_SUBJECT.index(subject)]

        print data_sheet.cell_value(row, 1)
        print h

        #diploma
        md = data_sheet.cell_value(row, 3)
        val.append([YEAR,HIJRI,h,'male','diploma', 'abroad', md])

        fd= data_sheet.cell_value(row+1, 3)
        val.append([YEAR,HIJRI,h,'female','diploma', 'abroad', fd])

        # Male undergrad
        mu = data_sheet.cell_value(row, 4)
        val.append([YEAR,HIJRI,h,'male','undergrad', 'abroad', mu])
        # Male grad
        mg = data_sheet.cell_value(row+1, 4)
        val.append([YEAR,HIJRI,h,'female','undergrad', 'abroad', mg])

        # Female grad
        fu = data_sheet.cell_value(row, 6) + data_sheet.cell_value(row, 7)
        val.append([YEAR,HIJRI,h,'male','grad', 'abroad', fu])

        # Female grad
        fg = data_sheet.cell_value(row+1, 6) + data_sheet.cell_value(row+1, 7)
        val.append([YEAR,HIJRI,h,'female','grad', 'abroad', fg])



    print val
    print len(val)

    write_data(val)



def parse_ugsheet():
    """
    parsing data from files in which undergrad and grad data are in separate sheets
    This works for 1433,
    row star at 17766
    :param path:
    :param usheet:
    :param gsheet:
    :return:
    """

    d_sheet = BOOK.sheet_by_name(D_SHEET)
    u_sheet = BOOK.sheet_by_name(U_SHEET)
    g_sheet = BOOK.sheet_by_name(G_SHEET)

    val = []
    h = ""
    for row in range(DSTARTROW,d_sheet.nrows):
        # h =  u_sheet.cell_value(row, 1)
        if(d_sheet.cell_value(row, 1) != ""):
            h =  conv_subject(d_sheet.cell_value(row, 1).encode('utf8'))
            print h

        jumlah = d_sheet.cell_value(row, 2)
        print jumlah
        if(jumlah == u'\u062c\u0645\u0644\u0629'):
            #undergrad_data.append(u_sheet.cell_value(row, 3))
            #undergrad_data.append(u_sheet.cell_value(row, 4))
            val.append([YEAR,HIJRI,h,'male','diploma', 'local', d_sheet.cell_value(row, 3)])
            val.append([YEAR,HIJRI,h,'female','diploma', 'local', d_sheet.cell_value(row, 4)])
            print 'diploma'
            print

    h = ""
    for row in range(USTARTROW,u_sheet.nrows):
        # h =  u_sheet.cell_value(row, 1)
        if(u_sheet.cell_value(row, 1) != ""):
            h = conv_subject(u_sheet.cell_value(row, 1).encode('utf8'))


        jumlah = u_sheet.cell_value(row, 2)
        if(jumlah == u'\u062c\u0645\u0644\u0629'):
            #undergrad_data.append(u_sheet.cell_value(row, 3))
            #undergrad_data.append(u_sheet.cell_value(row, 4))
            val.append([YEAR,HIJRI,h,'male','undergrad', 'local', u_sheet.cell_value(row, 3)])
            val.append([YEAR,HIJRI,h,'female','undergrad', 'local', u_sheet.cell_value(row, 4)])

    h = ""
    for row in range(GSTARTROW,g_sheet.nrows):
        #h =  g_sheet.cell_value(row, 1)

        if(g_sheet.cell_value(row, 1) != ""):
            h = conv_subject(g_sheet.cell_value(row, 1).encode('utf8'))
            print h

        jumlah = g_sheet.cell_value(row, 2)
        if(jumlah == u'\u062c\u0645\u0644\u0629'):
            #grad_data.append(g_sheet.cell_value(row, 3))
            #grad_data.append(g_sheet.cell_value(row, 4))
            val.append([YEAR,HIJRI,h,'male','grad', 'local', g_sheet.cell_value(row, 3)])
            val.append([YEAR,HIJRI,h,'female','grad', 'local', g_sheet.cell_value(row, 4)])


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
    with open('saudi_edu_data.csv', 'a') as csvfile:
        writer = csv.writer(csvfile)
        writer.writerows(list)


def conv_subject(arabic_subject):
    if arabic_subject == '':
        return 'NAN'
    elif (ARB_SUBJECT.index(arabic_subject) > -1):
        return ENG_SUBJECT[ARB_SUBJECT.index(arabic_subject)]



def get_subject():
    header = ['hijri', 'year']

    book = xlrd.open_workbook('years/1432-1431.xls')

    # get the data worksheet
    data_sheet = book.sheet_by_name('4-5')

    print data_sheet.nrows
    print data_sheet.ncols

    eng_subject = []
    arb_subject = []
    for row in range(6,130):
        # header
        eng_s =  data_sheet.cell_value(row, 13)
        arb_s =  data_sheet.cell_value(row, 1)
        if(eng_s != ''):
            eng_subject.append(eng_s)
            arb_subject.append(arb_s)

    print eng_subject
    print arb_subject
    print len(header)


# ----------------------------------------------------------------------
if __name__ == "__main__":
    BOOK = xlrd.open_workbook(FILE)
    ABOOK = xlrd.open_workbook(AFILE)

    #write_header(path, sheet)

    #parse_sheet()
    #parse_abraod_sheet()
    parse_ugsheet()
    #parse_ugshee_style2()
    #get_subject()
    #print ARB_SUBJECT[1]
    #print ENG_SUBJECT[1]
