from rest_framework import serializers
from authentication.serializers import AccountSerializer
from post.models import Post 

class PostSerializer(serializer.ModelSerializer):
	author = AccountSerializer(read_only=True, required=False)

	class Meta:
		model = Post
		fields = ('id', 'author', 'content', 'created_at', 'updated_at')
		read_only_fields = ('id', 'created_at', 'updated_at')

		def get_validated_exclusions(self, *args, **kwargs):
			get_validated_exclusions =super(PostSerializer, self).get_validated_exclusions()
			return exclusions + ['author']

























