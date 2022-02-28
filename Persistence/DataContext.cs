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
        public DbSet<Photo> Photos { get; set; }
        public DbSet<Comment> Comments { get; set; }
        public DbSet<UserFollowing> UserFollowings { get; set; } 
        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);

            builder.Entity<ActivityAttendee>().HasKey(aa => new { aa.ActivityId, aa.AppUserId });

            builder.Entity<ActivityAttendee>()
            .HasOne(a => a.AppUser)
            .WithMany(a => a.Activities)
            .HasForeignKey(a => a.AppUserId);

            builder.Entity<ActivityAttendee>()
            .HasOne(a => a.Activity)
            .WithMany(a => a.Attendees)
            .HasForeignKey(a => a.ActivityId);

            builder.Entity<Comment>()
            .HasOne(a => a.Activity)
            .WithMany(c => c.Comments)
            .OnDelete(DeleteBehavior.Cascade);

            builder.Entity<UserFollowing>(a=>
            {
                a.HasKey(ua => new { ua.ObserverId, ua.TargetId });
                
                a.HasOne(b=>b.Observer)
                .WithMany(b=>b.Followings)
                .HasForeignKey(b=>b.ObserverId)
                .OnDelete(DeleteBehavior.Cascade);

                a.HasOne(b=>b.Target)
                .WithMany(b=>b.Followers)
                .HasForeignKey(b=>b.TargetId)
                .OnDelete(DeleteBehavior.Cascade);
            });
        }
    }
}