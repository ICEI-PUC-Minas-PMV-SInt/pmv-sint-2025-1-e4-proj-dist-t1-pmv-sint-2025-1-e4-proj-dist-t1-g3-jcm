using NUnit.Framework;
using Microsoft.EntityFrameworkCore;
using Projeto_jcm_g3_eixo_4_2025_1.Models;
using Projeto_jcm_g3_eixo_4_2025_1.Controllers;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace JcmApiTest
{
    [TestFixture]
    public class CachorrosControllerTest
    {
        private AppDbContext _context;
        private CachorrosController _controller;

        [TearDown]
        public void TearDown()
        {
            _context.Dispose();
        }

        [SetUp]
        public void Setup()
        {

            var options = new DbContextOptionsBuilder<AppDbContext>()
                .UseInMemoryDatabase(databaseName: "TestDatabase")
                .Options;

            _context = new AppDbContext(options);

            _context.Cachorros.Add(new Cachorro { Nome = "Rex", Raca = "Labrador", Nascimento = 2015 });
            _context.Cachorros.Add(new Cachorro { Nome = "Thor", Raca = "Golden Retriever", Nascimento = 2018 });
            _context.SaveChanges();

            _controller = new CachorrosController(_context);
        }

        [Test]
        public async Task GetAll_WhenCalled_ReturnsAllItems()
        {

            var result = await _controller.GetAll();

            Assert.IsInstanceOf<OkObjectResult>(result);

            var okResult = result as OkObjectResult;
            Assert.NotNull(okResult?.Value);

            var actual = okResult.Value as List<Cachorro>;
            Assert.NotNull(actual);

            Assert.That(actual.Count, Is.EqualTo(2));

        }

        [Test]
        public async Task GetById_ExistingId_ReturnsCorrectItem()
        {

            var result = await _controller.GetById(1);

            Assert.IsInstanceOf<OkObjectResult>(result);

            var okResult = result as OkObjectResult;
            Assert.NotNull(okResult?.Value);

            var actual = okResult.Value as Cachorro;
            Assert.NotNull(actual);

            Assert.That(actual.Id, Is.EqualTo(1));
            Assert.That(actual.Nome, Is.EqualTo("Rex"));
        }

        [Test]
        public async Task Create_ValidObjectPassed_ReturnsCreatedResponse()
        {

            var newCachorro = new Cachorro
            {
                Nome = "Janis",
                Nascimento = 2020,
                Raca = "Poodle"
            };

            var result = await _controller.Create(newCachorro);

            Assert.IsInstanceOf<CreatedAtActionResult>(result);

            var createdResult = result as CreatedAtActionResult;
            Assert.NotNull(createdResult?.Value);

            var actual = createdResult.Value as Cachorro;
            Assert.NotNull(actual);
            Assert.That(actual.Nome, Is.EqualTo("Janis"));
            Assert.That(actual.Raca, Is.EqualTo("Poodle"));
            Assert.That(actual.Nascimento, Is.EqualTo(2020));

            var dbCachorro = _context.Cachorros.FirstOrDefault(c => c.Nome == "Janis");
            Assert.NotNull(dbCachorro);
            Assert.That(dbCachorro.Raca, Is.EqualTo("Poodle"));
        }

        [Test]
        public async Task Update_ExistingIdPassed_ReturnsNoContent()
        {
            var updatedCachorro = new Cachorro
            {
                Id = 1,
                Nome = "Rex Atualizado",
                Raca = "Labrador",
                Nascimento = 2015
            };

            var result = await _controller.Update(1, updatedCachorro);

            Assert.IsInstanceOf<NoContentResult>(result);

            var dbItem = _context.Cachorros.Find(1);
            Assert.NotNull(dbItem);
            Assert.That(dbItem.Nome, Is.EqualTo("Rex Atualizado"));
            Assert.That(dbItem.Raca, Is.EqualTo("Labrador"));
        }

        [Test]
        public async Task Delete_ExistingIdPassed_ReturnsNoContent()
        {

            var result = await _controller.Delete(1);

            Assert.IsInstanceOf<NoContentResult>(result);

            var deletedItem = _context.Cachorros.Find(1);
            Assert.Null(deletedItem);
        }

    }
}