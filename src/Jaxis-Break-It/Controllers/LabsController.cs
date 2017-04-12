using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.EntityFrameworkCore;
using Jaxis_Break_It.Data;

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
        [Route("")]
        public async Task<IActionResult> Index(string id = "")
        {
            Lab lab;

            if (String.IsNullOrEmpty(id))
            {
                lab = new Lab();
            } else
            {
                lab = await _context.Labs.SingleOrDefaultAsync(m => m.Slug == id);
            }
            

            return View(lab);
        }

        
        private bool LabExists(int id)
        {
            return _context.Labs.Any(e => e.Id == id);
        }
    }
}
