using Microsoft.EntityFrameworkCore;

namespace Models
{
    public class ActivityItemContext : DbContext
    {
        public ActivityItemContext(DbContextOptions<ActivityItemContext> options)
            : base(options)
        {
        }

        public DbSet<ActivityItem> ActivityItems { get; set; }
    }
}