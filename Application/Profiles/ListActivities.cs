using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Application.Activities;
using Application.Core;
using Application.Interfaces;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Profiles
{
    public class ListActivities
    {
        public class Query : IRequest<Result<List<UserActivityDto>>>
        {
            public string Predicate { get; set; }
            public string Username { get; set; }
        }
        public class Handler : IRequestHandler<Query, Result<List<UserActivityDto>>>
        {
            private readonly DataContext _context;
            private readonly IUserAccessor _userAccessor;
            private readonly IMapper _mapper;
            public Handler(DataContext context, IUserAccessor userAccessor, IMapper mapper)
            {
                _userAccessor = userAccessor;
                _context = context;
                _mapper = mapper;
            }
            public async Task<Result<List<UserActivityDto>>> Handle(Query request, CancellationToken cancellationToken)
            {
                var currentDate = DateTime.UtcNow;

                var query = _context.Activities
                .Where(d => d.Attendees.Any(a => a.AppUser.UserName == request.Username))
                .OrderBy(d => d.Date)
                .ProjectTo<UserActivityDto>(_mapper.ConfigurationProvider, new { currentUsername = request.Username })
                .AsQueryable();

                if (request.Predicate == "past")
                    query=query.Where(d => d.Date < currentDate);
                else if (request.Predicate == "hosting")
                    query=query.Where(d => d.HostUsername == request.Username);
                else
                    query=query.Where(d => d.Date > currentDate);

                return Result<List<UserActivityDto>>.Success(await query.ToListAsync());
            }
        }
    }
}