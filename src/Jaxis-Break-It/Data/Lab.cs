using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Jaxis_Break_It.Data
{
    public class Lab
    {

        [Key]
        public int Id { get; set; }

        [StringLength(255)]
        public string Title { get; set; }


        [StringLength(1024)]
        public string Description { get; set; }

        [StringLength(128)]
        public string Slug { get; set; }

        [StringLength(8192)]
        public string HTML { get; set; }

        [StringLength(8192)]
        public string CSS { get; set; }

        [StringLength(8192)]
        public string JS { get; set; }

        [StringLength(8192)]
        public string TourJSON { get; set; }
    }
}
