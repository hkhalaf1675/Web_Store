﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Core.DTOs.UserProfileDtos
{
    public class UserResetPasswordDto
    {
        public string? OldPassword { get; set; }
        public string? NewPassword { get; set; }
    }
}
