using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.EntityFrameworkCore;
using Jaxis_Break_It.Data;
using Microsoft.AspNetCore.Authorization;
using System.Text.RegularExpressions;

namespace Jaxis_Break_It.Controllers
{
    [Route("[controller]")]
    public class LabsController : Controller
    {
        private readonly ApplicationDbContext _context;


        public LabsController(ApplicationDbContext context)
        {
            _context = context;    
        }

        // GET: Labs
        [HttpGet("{id}")]
        [Route("{id}/{slug}")]
        [Route("")]
        public async Task<IActionResult> Index(int id = 0, string slug = "")
        {
            Lab lab;

            var creatorId = String.Empty;

            if(User.Identity.IsAuthenticated)
            {
                creatorId = _context.Users.Where(oo => oo.Email == HttpContext.User.Identity.Name).FirstOrDefault().Id;
            }
            

            if (id == 0)
            {
                lab = new Lab
                {
                    CreatorId = creatorId
                };
            } else
            {
                lab = await _context.Labs.SingleOrDefaultAsync(m => m.Id == id);

                //resolve to correct url if necessary
                if(slug != lab.Slug)
                {
                    return RedirectToAction("Index", new { id = id, slug = lab.Slug});
                }
            }

            ViewBag.IsCreator = false;
            if(creatorId == lab.CreatorId)
            {
                ViewBag.IsCreator = true;
            }

            return View(lab);
        }


        [Authorize]
        [Route("savelab")]
        public async Task<IActionResult> SaveLab(Lab lab)
        {
            if (ModelState.IsValid)
            {
                var creatorId = _context.Users.Where(oo => oo.Email == HttpContext.User.Identity.Name).FirstOrDefault().Id;

                //see if the lab already exists. If so, update
                if (lab.Id != 0)
                {
                    var existingLab = await _context.Labs.Where(oo => oo.Id == lab.Id).FirstOrDefaultAsync();
                    //check to make sure the student is logged in, and it is the lab owner
                    if (existingLab.CreatorId != creatorId)
                    {
                        return Content("{'success':'false','reason':'unathorized'}");
                    }

                    existingLab = lab;

                    _context.Update(existingLab);
                }
                else
                {
                    //let's turn the title into a unique slug
                    lab.Slug = Regex.Replace(lab.Title, @"[^A-Za-z0-9_\.~]+", "-");
                    lab.CreatorId = creatorId;

                    _context.Add(lab);
                }

                
                

                await _context.SaveChangesAsync();
                return Content("{'success':'true','id':'" + lab.Id + "'}");
            }
            else
            {
                return Content("{'success':'false','reason':'invalid'}");
            }
        }

        private bool LabExists(int id)
        {
            return _context.Labs.Any(e => e.Id == id);
        }
    }
}
