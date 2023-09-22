using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace QuizAPI.Migrations
{
    public partial class bankandclient2 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Players_Teams_TeamId",
                table: "Players");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Teams",
                table: "Teams");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Players",
                table: "Players");

            migrationBuilder.RenameTable(
                name: "Teams",
                newName: "Bank");

            migrationBuilder.RenameTable(
                name: "Players",
                newName: "Client");

            migrationBuilder.RenameIndex(
                name: "IX_Players_TeamId",
                table: "Client",
                newName: "IX_Client_TeamId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Bank",
                table: "Bank",
                column: "TeamId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Client",
                table: "Client",
                column: "PlayerId");

            migrationBuilder.AddForeignKey(
                name: "FK_Client_Bank_TeamId",
                table: "Client",
                column: "TeamId",
                principalTable: "Bank",
                principalColumn: "TeamId",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Client_Bank_TeamId",
                table: "Client");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Client",
                table: "Client");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Bank",
                table: "Bank");

            migrationBuilder.RenameTable(
                name: "Client",
                newName: "Players");

            migrationBuilder.RenameTable(
                name: "Bank",
                newName: "Teams");

            migrationBuilder.RenameIndex(
                name: "IX_Client_TeamId",
                table: "Players",
                newName: "IX_Players_TeamId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Players",
                table: "Players",
                column: "PlayerId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Teams",
                table: "Teams",
                column: "TeamId");

            migrationBuilder.AddForeignKey(
                name: "FK_Players_Teams_TeamId",
                table: "Players",
                column: "TeamId",
                principalTable: "Teams",
                principalColumn: "TeamId",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
