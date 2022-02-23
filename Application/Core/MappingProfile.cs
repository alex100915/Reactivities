using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Application.Activities;
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

            CreateMap<ActivityAttendee, Profiles.Profile>()
                .ForMember(a => a.Bio, b => b.MapFrom(o => o.AppUser.Bio))
                .ForMember(a => a.DisplayName, b => b.MapFrom(o => o.AppUser.DisplayName))
                .ForMember(a => a.Username, b => b.MapFrom(o => o.AppUser.UserName));
        }
    }
}