using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using Jaxis_Break_It.Data;
using Jaxis_Break_It.Models;
using Jaxis_Break_It.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Identity;

namespace Jaxis_Break_It
{
    public class Startup
    {
        public Startup(IHostingEnvironment env)
        {
           var builder = new ConfigurationBuilder()
                .SetBasePath(env.ContentRootPath)
                .AddJsonFile("appsettings.json", optional: true, reloadOnChange: true)
                .AddJsonFile($"appsettings.{env.EnvironmentName}.json", optional: true);

            if (env.IsDevelopment())
            {
                // For more details on using the user secret store see http://go.microsoft.com/fwlink/?LinkID=532709
                builder.AddUserSecrets();

                // This will push telemetry data through Application Insights pipeline faster, allowing you to view results immediately.
                builder.AddApplicationInsightsSettings(developerMode: true);
            }

            builder.AddEnvironmentVariables();
            Configuration = builder.Build();
        }

        public IConfigurationRoot Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            // Add framework services.
            services.AddApplicationInsightsTelemetry(Configuration);

            services.AddDbContext<ApplicationDbContext>(options =>
                options.UseSqlServer(Configuration.GetConnectionString("DefaultConnection")));

            services.AddIdentity<ApplicationUser, IdentityRole>()
                .AddEntityFrameworkStores<ApplicationDbContext>()
                .AddDefaultTokenProviders();

            services.AddMvc(options =>
            {
               // options.SslPort = 44300;
                options.Filters.Add(new RequireHttpsAttribute());
            });

            // Add application services.
            services.AddTransient<IEmailSender, AuthMessageSender>();
            services.AddTransient<ISmsSender, AuthMessageSender>();

            //Security
            services.AddAuthorization(options =>
            {
                options.AddPolicy("Admin", policy => policy.RequireRole("Admin"));
            });
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env, ILoggerFactory loggerFactory)
        {
            loggerFactory.AddConsole(Configuration.GetSection("Logging"));
            loggerFactory.AddDebug();

            app.UseApplicationInsightsRequestTelemetry();

            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
                app.UseDatabaseErrorPage();
                app.UseBrowserLink();
            }
            else
            {
                app.UseExceptionHandler("/Home/Error");
            }

            app.UseApplicationInsightsExceptionTelemetry();

            app.UseStaticFiles();

            app.UseIdentity();

            // Add external authentication middleware below. To configure them please see http://go.microsoft.com/fwlink/?LinkID=532715
            app.UseFacebookAuthentication(new FacebookOptions()
            {
                AppId = "235909530211479",
                AppSecret = "bf5784df45e0da1ccf98ded7860f90f7"
            });

            app.UseMvc(routes =>
            {
                routes.MapRoute(
                    name: "default",
                    template: "{controller=Home}/{action=Index}/{id?}");
            });

            CreateRolesandUsers();
        }

        // In this method we will create default User roles and Admin user for login   
        private async void CreateRolesandUsers()
        {
            var options = new DbContextOptionsBuilder<ApplicationDbContext>();
            options.UseSqlServer(Configuration.GetConnectionString("DefaultConnection"));
            var db = new ApplicationDbContext(options.Options);

            var roleManager = new RoleManager<IdentityRole>(new RoleStore<IdentityRole>(db), null, null, null, null, null);
            var UserManager = new UserManager<ApplicationUser>(new UserStore<ApplicationUser>(db), null, null, null, null, null, null, null, null);


            // In Startup iam creating first Admin Role and creating a default Admin User    
            if (!await roleManager.RoleExistsAsync("Admin"))
            {

                // first we create Admin rool   
                var role = new Microsoft.AspNetCore.Identity.EntityFrameworkCore.IdentityRole();
                role.Name = "Admin";
                await roleManager.CreateAsync(role);
            }


            //Here we create a Admin super user who will maintain the website
            //var user = new ApplicationUser();
            //user.UserName = "";
            //user.Email = "";
            //if (!await UserManager.IsInRoleAsync(user, "Admin"))
            //{
            //    string userPWD = "";

            //    var chkUser = await UserManager.CreateAsync(user, userPWD);

            //    //Add default User to Role Admin   
            //    if (chkUser.Succeeded)
            //    {
                    //var result1 = await UserManager.AddToRoleAsync(user, "Admin");

            //    }
            //}


            ////example role creations
            //// creating Creating Manager role    
            //if (!await roleManager.RoleExistsAsync("Manager"))
            //{
            //    var role = new Microsoft.AspNetCore.Identity.EntityFrameworkCore.IdentityRole();
            //    role.Name = "Manager";
            //    await roleManager.CreateAsync(role);

            //}

        }
    }
}
