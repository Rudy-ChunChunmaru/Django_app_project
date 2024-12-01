from django.db import connection

class User:
    sqlQuery = connection.cursor()
    def __init__(self):
        pass

    def getUser(self,strwhere=''):
        strQuery = '''
            SELECT 

            user.id,
            user.username,
            user.first_name,
            user.last_name,
            user.email,
            user.date_joined,
            user.last_login,
            user.is_superuser,
            user.is_staff,
            user.is_active
                
            FROM

            auth_user user
        '''

        if(strwhere):
            strQuery += ' WHERE %s ' % (strwhere)
        
        self.sqlQuery.execute(strQuery)
        columns = [col[0] for col in self.sqlQuery.description]
        result = [dict(zip(columns, row)) for row in self.sqlQuery.fetchall()]

        return result
    
