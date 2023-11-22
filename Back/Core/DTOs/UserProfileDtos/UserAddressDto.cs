﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Core.DTOs.UserProfileDtos
{
    public class UserAddressDto
    {
        public int? Id { get; set; }
        public string? Street { get; set; }
        public string? City { get; set; }
        public string? State { get; set; }
        public string? Country { get; set; }
        public int? PostalCode { get; set; }
        public string? SpecialInstructions { get; set; }
    }
}
