from rest_framework import serializers

from chillfinance.models import CustomUser, Bank, BankAccount, Balance, Entertainment, Category


class CustomUserSerializer(serializers.ModelSerializer):
    email = serializers.EmailField()
    username = serializers.CharField(max_length=20)
    password = serializers.CharField(write_only=True)
    class Meta:
        model = CustomUser
        fields = ['email', 'username', 'password']

class GetTokenSerializer(serializers.Serializer):
    username = serializers.CharField(label='Username', required=True)
    password = serializers.CharField(label='Password', required=True)

class UserListSerializer(serializers.ModelSerializer):
    def create(self, validated_data):
        user = CustomUser(**validated_data)

        user.set_password(validated_data["password"])
        user.save()

        return user

    categories = serializers.SlugRelatedField(
        queryset=Category.objects.all(), many=True, slug_field="name"
    )
    
    class Meta:
        model = CustomUser
        fields = [
            "id",
            "username",
            "role",
            "email",
            "categories"
        ]
class BankSerializer(serializers.ModelSerializer):
    class Meta:
        model = Bank
        fields = ['id', 'name', 'image_url']
class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ['id', 'name']


class EntertainmentSerializer(serializers.ModelSerializer):
    categories = CategorySerializer(many=True, read_only=True)

    class Meta:
        model = Entertainment
        fields = ['id', 'title', 'description', 'categories']


class BankAccountSerializer(serializers.ModelSerializer):
    user = serializers.StringRelatedField()
    bank = serializers.StringRelatedField()

    class Meta:
        model = BankAccount
        fields = ['id', 'user', 'bank', 'is_auth', 'account_number']


class BalanceSerializer(serializers.ModelSerializer):
    user_bank_account = BankAccountSerializer(read_only=True)

    class Meta:
        model = Balance
        fields = ['id', 'user_bank_account', 'balance']