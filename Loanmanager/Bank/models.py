from django.db import models
from Auth.models import User


class Loan(models.Model):
    LOAN_STATUS = (
        ('N', 'NEW'),
        ('R', 'REJECTED'),
        ('A', 'APPROVED')
    )
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    principal = models.IntegerField()
    emi = models.DecimalField(max_digits=8, decimal_places=2, blank=True)
    interest_rates = models.DecimalField(max_digits=4, decimal_places=2)
    tenure = models.IntegerField()
    total_interest = models.DecimalField(
        max_digits=8, decimal_places=2, blank=True)
    status = models.CharField(
        max_length=1, null=True, choices=LOAN_STATUS, default='N')
    created = models.DateTimeField(auto_now_add=True)
    modified = models.DateTimeField(auto_now=True)

    @property
    def get_emi(self):
        rate = self.interest_rates/1200
        principal = self.principal
        tenure = self.tenure
        temp = pow(rate+1, tenure)
        emi = (principal*rate*temp)/(temp-1)
        return emi

    def save(self, *args, **kwargs):
        emi = self.get_emi
        self.emi = emi
        self.total_interest = (emi*self.tenure)-self.principal
        super(Loan, self).save(*args, **kwargs)
