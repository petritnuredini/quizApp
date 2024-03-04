﻿using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace QuizAPI.Migrations
{
    public partial class teamslab1 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "PlayerSurname",
                table: "Players",
                newName: "BirthYear");

            migrationBuilder.AddColumn<int>(
                name: "Number",
                table: "Players",
                type: "int",
                nullable: false,
                defaultValue: 0);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Number",
                table: "Players");

            migrationBuilder.RenameColumn(
                name: "BirthYear",
                table: "Players",
                newName: "PlayerSurname");
        }
    }
}
