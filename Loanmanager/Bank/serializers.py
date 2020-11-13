from rest_framework import serializers
from .models import Loan
from Auth.models import User
from Auth.serializers import UserSerializer


class RelatedFieldAlternative(serializers.PrimaryKeyRelatedField):
    def __init__(self, **kwargs):
        self.serializer = kwargs.pop('serializer', None)
        if self.serializer is not None and not issubclass(self.serializer, serializers.Serializer):
            raise TypeError('"serializer" is not a valid serializer class')

        super().__init__(**kwargs)

    def use_pk_only_optimization(self):
        return False if self.serializer else True

    def to_representation(self, instance):
        if self.serializer:
            return self.serializer(instance, context=self.context).data
        return super().to_representation(instance)


class LoanSerializer(serializers.ModelSerializer):
    user = RelatedFieldAlternative(
        queryset=User.objects.all(), serializer=UserSerializer)

    class Meta:
        model = Loan
        fields = ('id', 'user', 'principal', 'interest_rates',
                  'tenure', 'emi', 'total_interest', 'status')
