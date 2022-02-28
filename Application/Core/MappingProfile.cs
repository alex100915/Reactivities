using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Application.Activities;
using Application.Comments;
using AutoMapper;
using Domain;

namespace Application.Core
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            string currentUsername=null;

            CreateMap<Activity, Activity>();
            CreateMap<Activity, ActivityDto>()
            .ForMember(a => a.HostUsername, o => o.MapFrom(s => s.Attendees
                 .FirstOrDefault(x => x.IsHost).AppUser.UserName));

            CreateMap<ActivityAttendee, AttendeeDto>()
                .ForMember(a => a.Bio, b => b.MapFrom(o => o.AppUser.Bio))
                .ForMember(a => a.DisplayName, b => b.MapFrom(o => o.AppUser.DisplayName))
                .ForMember(a => a.Username, b => b.MapFrom(o => o.AppUser.UserName))
                .ForMember(u=>u.Image, o=>o.MapFrom(i=>i.AppUser.Photos.FirstOrDefault(p=>p.IsMain).Url))
                .ForMember(u=>u.FollowersCount, o=>o.MapFrom(f=>f.AppUser.Followers.Count()))
                .ForMember(u=>u.FollowingCount, o=>o.MapFrom(f=>f.AppUser.Followings.Count()))
                .ForMember(u=>u.Following, o=>o.MapFrom(f=>f.AppUser.Followers.Any(x=>x.Observer.UserName==currentUsername)));
            CreateMap<AppUser,Profiles.Profile>()
                .ForMember(u=>u.Image, o=>o.MapFrom(i=>i.Photos.FirstOrDefault(p=>p.IsMain).Url))
                .ForMember(u=>u.FollowersCount, o=>o.MapFrom(f=>f.Followers.Count()))
                .ForMember(u=>u.FollowingCount, o=>o.MapFrom(f=>f.Followings.Count()))
                .ForMember(u=>u.Following, o=>o.MapFrom(f=>f.Followers.Any(x=>x.Observer.UserName==currentUsername)));
            CreateMap<Comment,CommentDto>()
                .ForMember(a => a.DisplayName, b => b.MapFrom(o => o.Author.DisplayName))
                .ForMember(a => a.Username, b => b.MapFrom(o => o.Author.UserName))
                .ForMember(u=>u.Image, o=>o.MapFrom(i=>i.Author.Photos.FirstOrDefault(p=>p.IsMain).Url));
        }
    }
}