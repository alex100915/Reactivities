using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Application.Core;
using Application.Interfaces;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Photos
{
    public class Delete
    {
        public class Command : IRequest<Result<Unit>>
        {
            public string Id { get; set; }
        }

        public class Handler : IRequestHandler<Command, Result<Unit>>
        {
            private readonly IPhotoAccessor _photoAccessor;
            private readonly IUserAccessor _userAccessor;
            private readonly DataContext _context;
            public Handler(DataContext context, IPhotoAccessor photoAccessor, IUserAccessor userAccessor)
            {
                _context = context;
                _userAccessor = userAccessor;
                _photoAccessor = photoAccessor;
            }
            public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
            {
                var user= await _context.Users.Include(p=>p.Photos)
                .FirstOrDefaultAsync(x=>x.UserName==_userAccessor.GetUsername());

                if(user==null) return null;

                var photo=user.Photos.FirstOrDefault(x=>x.Id==request.Id);

                if(photo==null) return null;
                if(photo.IsMain) return Result<Unit>.Failure("You cannot delete your main photo");
                var result=await _photoAccessor.DeletePhoto(photo.Id);
                if(result==null) return Result<Unit>.Failure("Problem deleting foto from Cloudinary");

                user.Photos.Remove(photo);

                var scucess= await _context.SaveChangesAsync() >0;
                if(scucess) return Result<Unit>.Success(Unit.Value);

                return Result<Unit>.Failure("Problem deleting photo from API");
            }
        }
    }
}