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
            CreateMap<Activity, Activity>();
            CreateMap<Activity, ActivityDto>()
            .ForMember(a => a.HostUsername, o => o.MapFrom(s => s.Attendees
                 .FirstOrDefault(x => x.IsHost).AppUser.UserName));

            CreateMap<ActivityAttendee, AttendeeDto>()
                .ForMember(a => a.Bio, b => b.MapFrom(o => o.AppUser.Bio))
                .ForMember(a => a.DisplayName, b => b.MapFrom(o => o.AppUser.DisplayName))
                .ForMember(a => a.Username, b => b.MapFrom(o => o.AppUser.UserName))
                .ForMember(u=>u.Image, o=>o.MapFrom(i=>i.AppUser.Photos.FirstOrDefault(p=>p.IsMain).Url));
            CreateMap<AppUser,Profiles.Profile>()
                .ForMember(u=>u.Image, o=>o.MapFrom(i=>i.Photos.FirstOrDefault(p=>p.IsMain).Url));
            CreateMap<Comment,CommentDto>()
                .ForMember(a => a.DisplayName, b => b.MapFrom(o => o.Author.DisplayName))
                .ForMember(a => a.Username, b => b.MapFrom(o => o.Author.UserName))
                .ForMember(u=>u.Image, o=>o.MapFrom(i=>i.Author.Photos.FirstOrDefault(p=>p.IsMain).Url));
        }
    }
}