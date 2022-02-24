using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Domain;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace Persistence
{
    public class DataContext : IdentityDbContext<AppUser>
    {
        public DataContext(DbContextOptions options) : base(options)
        {
        }

        public DbSet<Activity> Activities { get; set; }
        public DbSet<ActivityAttendee> ActivityAttendees { get; set; }
        public DbSet<Photo> Photos {get;set;}
        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);

            builder.Entity<ActivityAttendee>().HasKey(aa => new { aa.ActivityId, aa.AppUserId });
            
            builder.Entity<ActivityAttendee>()
            .HasOne(a=>a.AppUser)
            .WithMany(a=>a.Activities)
            .HasForeignKey(a=>a.AppUserId);

            builder.Entity<ActivityAttendee>()
            .HasOne(a=>a.Activity)
            .WithMany(a=>a.Attendees)
            .HasForeignKey(a=>a.ActivityId);
        }
    }
}