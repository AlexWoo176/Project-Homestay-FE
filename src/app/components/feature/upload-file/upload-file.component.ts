import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {AngularFireStorage, AngularFireStorageReference} from '@angular/fire/storage';
import {HttpClient} from '@angular/common/http';
import {HostService} from '../../../services/host.service';
import UploadTaskSnapshot = firebase.storage.UploadTaskSnapshot;

@Component({
  selector: 'app-upload-file',
  templateUrl: './upload-file.component.html',
  styleUrls: ['./upload-file.component.css']
})
export class UploadFileComponent implements OnInit {
  files: File[];
  imageUrls: string[] = [];
  ref: AngularFireStorageReference;
  percent = 0;
  index = 0;
  btn = 'Upload';
  totalFile = 0;
  @Output()
  press = new EventEmitter<string[]>();

  constructor(
    private http: HttpClient,
    private afStorage: AngularFireStorage,
    private hostService: HostService
  ) {
  }

  ngOnInit(): void {
  }

  onFileChanged(event): void {
    this.files = event.target.files;
    this.totalFile = this.files.length;
    this.percent = 0;
    this.index = 0;
  }

  // tslint:disable-next-line:typedef
  async onUpload() {
    try {
      this.index = 1;
      document.getElementById('upload').innerHTML = 'Uploading';
      for (const file of this.files) {
        const id = Math.random().toString(36).substring(2);
        this.ref = this.afStorage.ref(id);

        const snapshot: UploadTaskSnapshot = await this.ref.put(file);
        const downloadUrl = await snapshot.ref.getDownloadURL();

        this.imageUrls.push(downloadUrl);
        this.percent = Math.round(this.index / this.totalFile * 100);
        this.index = this.index === this.totalFile ? this.index : this.index + 1;
      }
    } catch (e) {
      console.log(`Failed to upload file and get link - ${e}`);
    }
    this.press.emit(this.imageUrls);
    document.getElementById('upload').innerHTML = 'Upload';
  }
}
