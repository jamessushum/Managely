using Managely.Models;

namespace Managely.Repositories
{
    public interface IUserProfileRepository
    {
        UserProfile GetByFirebaseUserId(string firebaseUserId);

        public void Add(UserProfile userProfile);
    }
}