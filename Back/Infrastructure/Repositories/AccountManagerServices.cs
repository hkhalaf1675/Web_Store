using Core.DTOs;
using Core.IServices;
using Core.Models;
using ECommerceGP.Bl.Dtos.UserDtos;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace Infrastructure.Services
{
    public class AccountManagerServices:IAccountManagerServices
    {
        // Modification :
        // -> check the role exists

        #region Injection
        private readonly ECommerceDBContext context;
        private readonly UserManager<User> userManager;
        private readonly IConfiguration configuration;
        private readonly RoleManager<IdentityRole<int>> roleManager;

        public AccountManagerServices(ECommerceDBContext _context, UserManager<User> _userManager, IConfiguration _configuration, RoleManager<IdentityRole<int>> _roleManager)
        {
            context = _context;
            userManager = _userManager;
            configuration = _configuration;
            roleManager = _roleManager;
        } 
        #endregion

        #region Register Methdo Logic
        public async Task<AuthModel> RegisterAsync(UserRegisterDTO registerDto)
        {
            #region Check if there is user with the same email or username
            if (await userManager.FindByEmailAsync(registerDto.Email) is not null)
                return new AuthModel { Message = "Email is already registered!" };

            if (await userManager.FindByNameAsync(registerDto.UserName) is not null)
                return new AuthModel { Message = "Username is already registered!" };
            #endregion

            var user = new User
            {
                UserName = registerDto.UserName,
                Email = registerDto.Email,
                FullName = registerDto.FullName,
                Address = registerDto.Address,
                PhoneNumber = registerDto.PhoneNumber
                
            };
            var result = await userManager.CreateAsync(user, registerDto.password);

            if (!result.Succeeded)
            {
                var errors = string.Empty;

                foreach (var error in result.Errors)
                    errors += $"{error.Description},";

                return new AuthModel { Message = errors };
            }

            // check the role exists
            var check = await roleManager.RoleExistsAsync("Client");

            if (!check)
            {
                var role = new IdentityRole<int>("Client");

                var checkRoleCreation = await roleManager.CreateAsync(role);

                if (!checkRoleCreation.Succeeded)
                    return new AuthModel { Message = "can non add role" };
            }

            await userManager.AddToRoleAsync(user, "Client");

            #region Add the user Address to the Addresses Table

            var addressDetails = registerDto?.Address?.Split(',');

            var lastUser = await userManager.FindByEmailAsync(registerDto.Email);

            if (addressDetails.Length < 3)
            {
                // if the address not consist from 3 parts will delete it
                lastUser.Address = null;
                await userManager.UpdateAsync(lastUser);

                return new AuthModel { Message = "The User was Addede but the address and saved not saved" };
            }

            context.Address.Add(new Address
            {
                UserID = lastUser?.Id,
                Street = addressDetails[0],
                City = addressDetails[1],
                Country = addressDetails[2]
            });

            context.Phones.Add(new Phone
            {
                UserID = lastUser?.Id,
                PhoneNumber = registerDto.PhoneNumber
            });

            try
            {
                context.SaveChanges();
            }
            catch (Exception ex)
            {
                return new AuthModel { Message = $"There is an error on saving Address and Phones : {ex.Message}" };
            }

            #endregion

            var jwtSecurityToken = await CreateJwtTokenAsync(user);


            return new AuthModel
            {
                Email = user.Email,
                ExpiresOn = jwtSecurityToken.ValidTo,
                IsAuthenticated = true,
                Roles = new List<string> { "User" },
                Token = new JwtSecurityTokenHandler().WriteToken(jwtSecurityToken),
                Username = user.UserName,
            };
        }
        #endregion

        #region Login Method Logic
        public async Task<AuthModel> LoginAsync(LoginCredentialsDTO loginDto)
        {
            AuthModel authModel = new AuthModel();

            var user = await userManager.FindByNameAsync(loginDto.username);
            if (user is null || !await userManager.CheckPasswordAsync(user, loginDto.password))
            {
                authModel.Message = "The Email or the password is incorrect";
                return authModel;
            }
            JwtSecurityToken jwtSecurityToken = await CreateJwtTokenAsync(user);

            authModel.IsAuthenticated = true;
            authModel.ExpiresOn = jwtSecurityToken.ValidTo;
            authModel.Email = user.Email;
            authModel.Username = user.UserName;
            authModel.Token = new JwtSecurityTokenHandler().WriteToken(jwtSecurityToken);

            var roles = await userManager.GetRolesAsync(user);
            authModel.Roles = roles.ToList();


            return authModel;
        }
        #endregion

        #region create The JwtToken
        private async Task<JwtSecurityToken> CreateJwtTokenAsync(User user)
        {
            var userClaims = await userManager.GetClaimsAsync(user);
            var roles = await userManager.GetRolesAsync(user);

            foreach (var role in roles)
                userClaims.Add(new Claim(ClaimTypes.Role, role));

            userClaims.Add(new Claim(ClaimTypes.Name, user.UserName));
            userClaims.Add(new Claim(ClaimTypes.GivenName, user.FullName));
            userClaims.Add(new Claim(ClaimTypes.Email, user.Email));
            userClaims.Add(new Claim(ClaimTypes.StreetAddress, user.Address));
            userClaims.Add(new Claim(ClaimTypes.MobilePhone, user.PhoneNumber));
            userClaims.Add(new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()));
            userClaims.Add(new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()));

            var symmetricSecurityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(configuration.GetValue<string>("JWT:Key")));
            var signingCredentials = new SigningCredentials(symmetricSecurityKey, SecurityAlgorithms.HmacSha256);

            var jwtSecurityToken = new JwtSecurityToken
                (
                    claims: userClaims,
                    expires: DateTime.UtcNow.AddMinutes(configuration.GetValue<double>("JWT:DurationInMinutes")),
                    signingCredentials: signingCredentials
                );

            return jwtSecurityToken;
        }
        #endregion
    }
}
