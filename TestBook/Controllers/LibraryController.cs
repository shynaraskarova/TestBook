using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TestBook.Dto;
using TestBook.Model;

namespace TestBook.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    [AllowAnonymous]
    public class LibraryController : Controller
    {
        private readonly AppTestBookContext _context;

        public LibraryController(AppTestBookContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<IActionResult> GetAllCategories()
        {
            List<Category> result = await _context.Categories
                .AsNoTracking()
                .Select(q => new Category()
                {
                    Id = q.Id,
                    Name = q.Name
                })
                .AsNoTracking()
                .ToListAsync();
            return Ok(result);
        }

        [HttpPost]
        public async Task<IActionResult> SetCategory([FromBody]CategoryDto dto)
        {
            Category old = await _context.Categories.FindAsync(dto.id);

            if (old == null)
            {
                old = new Category()
                {
                    Name = dto.name
                };
                _context.Categories.Add(old);
            }
            else
            {
                old.Name = dto.name;
                _context.Update(old);
            }
            await _context.SaveChangesAsync();

            return Ok(old);
        }

        [HttpGet]
        public async Task<IActionResult> DeleteCategory(long id)
        {
            Category model = await _context.Categories.FindAsync(id);
            _context.Categories.Remove(model);
            await _context.SaveChangesAsync();
            return Ok(new { message = "deleted", status = true });

        }

        [HttpGet]
        public async Task<IActionResult> GetAllBooks()
        {
            List<Book> result = await _context.Books
                .AsNoTracking()
                .Select(q => new Book()
                {
                    Id = q.Id,
                    Name = q.Name,
                    Year = q.Year,
                    Category = new Category()
                    {
                        Id = q.Category.Id,
                        Name = q.Category.Name
                    }
                })
                .AsNoTracking()
                .ToListAsync();
            return Ok(result);
        }

        [HttpPost]
        public async Task<IActionResult> SetBook([FromBody]BookDto dto)
        {
            Book old = await _context.Books.FindAsync(dto.id);

            if (old == null)
            {
                old = new Book()
                {
                    Name = dto.name,
                    Year = dto.year,
                    CategoryId = dto.category_id
                };
                _context.Books.Add(old);
            }
            else
            {
                old.Name = dto.name;
                old.CategoryId = dto.category_id;
                old.Year = dto.year;
                _context.Update(old);
            }
            await _context.SaveChangesAsync();

            return Ok(old);
        }

        [HttpGet]
        public async Task<IActionResult> DeleteBook(long id)
        {
            Book model = await _context.Books.FindAsync(id);
            _context.Books.Remove(model);
            await _context.SaveChangesAsync();
            return Ok(new { message = "deleted", status = true });

        }
    }
}
