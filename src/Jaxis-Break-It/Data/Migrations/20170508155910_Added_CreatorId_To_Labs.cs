using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Jaxis_Break_It.Data.Migrations
{
    public partial class Added_CreatorId_To_Labs : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "CreatorId",
                table: "Labs",
                maxLength: 450,
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Labs_CreatorId",
                table: "Labs",
                column: "CreatorId");

            migrationBuilder.AddForeignKey(
                name: "FK_Labs_AspNetUsers_CreatorId",
                table: "Labs",
                column: "CreatorId",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Labs_AspNetUsers_CreatorId",
                table: "Labs");

            migrationBuilder.DropIndex(
                name: "IX_Labs_CreatorId",
                table: "Labs");

            migrationBuilder.DropColumn(
                name: "CreatorId",
                table: "Labs");
        }
    }
}
