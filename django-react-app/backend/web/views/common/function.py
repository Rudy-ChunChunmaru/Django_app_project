
class DataProses:
    def __init__(self,data,request):
        self.data = data
        self.request = request

    def RageData(self,page=0,rage=5):
        if self.request.GET.get('rage'):
            try:
                rage = int(self.request.GET.get('rage'))
            except:
                rage = rage
        if self.request.GET.get('page'):
            try:
                limitdata = int(self.request.GET.get('page')) * rage
                self.data = self.data[limitdata-rage:limitdata]
            except:
                self.data = self.data[0:rage]
            else:
                self.data = self.data[0:rage]