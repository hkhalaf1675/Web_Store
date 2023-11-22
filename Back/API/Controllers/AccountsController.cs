using Core.Models;
using ECommerceGP.Bl.Dtos.UserDtos;
using ECommerceGP.Bl;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Infrastructure.Repositories;
using Core.IRepositories;
using Core.IServices;
using Core.DTOs;
using Infrastructure;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AccountsController : ControllerBase
    {
        // Modification :
        // -> check the role exists

        #region Injection
        private readonly UserManager<User> userManager;
       
        private readonly IAccountManagerServices accountManager;
        private readonly IConfiguration configuration;
        private readonly RoleManager<IdentityRole<int>> roleManager;
        private readonly ECommerceDBContext context;

        public AccountsController(UserManager<User> _userManager, IAccountManagerServices _accountManager, IConfiguration _configuration, RoleManager<IdentityRole<int>> _roleManager,ECommerceDBContext _context)
        {
            this.userManager = _userManager;
           
            accountManager = _accountManager;
            this.configuration = _configuration;
            roleManager = _roleManager;
            context = _context;
        }
        #endregion

        #region Register New Version
        [HttpPost("register")]
        public async Task<IActionResult> Register(UserRegisterDTO registerDto)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var result = await accountManager.RegisterAsync(registerDto);

            if (!result.IsAuthenticated)
                return BadRequest(result.Message);

            return Ok(new TokenDTO
            {
                Token = result.Token
            });
        }
        #endregion

        #region login New version
        [HttpPost("login")]
        public async Task<IActionResult> Login(LoginCredentialsDTO loginDto)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var result = await accountManager.LoginAsync(loginDto);

            if (!result.IsAuthenticated)
                return BadRequest(result.Message);

            return Ok(new TokenDTO
            {
                Token = result.Token
            });
        }
        #endregion


        // hashed?
        #region Get Current User
        //[HttpGet]
        //[Authorize]
        //[Route("CurrentUser")]
        //public async Task<ActionResult> GetCurrentUser()
        //{
        //    var CurrentUser = await userManager.GetUserAsync(User);
        //    return Ok(
        //        new
        //        {
        //            Id = CurrentUser.Id,
        //            UserName = CurrentUser.UserName
        //        }
        //        );
        //}
        #endregion

    }

}