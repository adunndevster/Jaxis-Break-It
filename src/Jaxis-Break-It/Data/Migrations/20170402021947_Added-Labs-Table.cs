using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Metadata;

namespace Jaxis_Break_It.Data.Migrations
{
    public partial class AddedLabsTable : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_AspNetUserRoles_UserId",
                table: "AspNetUserRoles");

            migrationBuilder.CreateTable(
                name: "Labs",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    CSS = table.Column<string>(maxLength: 8192, nullable: true),
                    Description = table.Column<string>(maxLength: 1024, nullable: true),
                    HTML = table.Column<string>(maxLength: 8192, nullable: true),
                    JS = table.Column<string>(maxLength: 8192, nullable: true),
                    Slug = table.Column<string>(maxLength: 128, nullable: true),
                    Title = table.Column<string>(maxLength: 255, nullable: true),
                    TourJSON = table.Column<string>(maxLength: 4096, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Labs", x => x.Id);
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Labs");

            migrationBuilder.CreateIndex(
                name: "IX_AspNetUserRoles_UserId",
                table: "AspNetUserRoles",
                column: "UserId");
        }
    }
}
