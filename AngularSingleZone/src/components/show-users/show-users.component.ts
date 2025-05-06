import { Component, OnInit } from "@angular/core";
import { RouterLink, RouterLinkActive, RouterOutlet } from "@angular/router";
import { User } from "../../app/models/user";
import { UserService } from "../../services/user.service";
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog';
import { EditUserComponent } from "../edit-user-component/edit-user-component.component";



@Component({
  selector: 'app-show-users',
  standalone: true,
  imports: [RouterOutlet,MatCardModule, MatButtonModule,RouterLinkActive, RouterLink,MatButtonModule, MatIconModule],
  templateUrl: './show-users.component.html',
  styleUrl: './show-users.component.css'
})
export class ShowUsersComponent implements OnInit{
constructor( private dialog: MatDialog,  private userService:UserService){
  console.log('✅ EditUserComponent loaded!');
}

users:User[]=[]
ngOnInit(): void {

  this.userService.getUsers().subscribe({
    next: (data) =>
    {
      this.users = data;
      console.log(this.users); 
    },
    error: (error) => {
      console.error('Error fetching courses:', error);
    }
  })

}
deleteUser(id:string){
    this.userService.deleteUser(id).subscribe(
      (response) => {
        console.log('Course deleted successfully:', response);
        this.users = this.users.filter(user => user.id !== id);

      },
      (error) => {
        console.error('Error deleting course:', error);
      }
    );
  }


  editUser(user: User): void {
  
    const dialogRef = this.dialog.open(EditUserComponent, {
      data: { user }, // שולחים את הקורס למודל
    });
    console.log('📢 אחרי פתיחת הדיאלוג');

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log('Course was updated successfully!');
        this.getUsers();
      }
    });
  }
  getUsers(): void {
    this.userService.getUsers().subscribe(data => {
      this.users = data;
    });
  }

}
