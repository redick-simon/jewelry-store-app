import { Component, ComponentFactoryResolver, OnDestroy, OnInit, ViewChild, ɵɵtrustConstantResourceUrl } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { PluginDirective } from '../directives/plugin-directive';
import { PopUpComponent } from '../dynamic-component/pop-up.component';
import { AuthService } from '../services/auth.service';
import { JewelryService } from '../services/jewelry.service';
import { User } from '../services/user.model';

@Component({
  selector: 'app-jewelry',
  templateUrl: './jewelry.component.html',
  styleUrls: ['./jewelry.component.css']
})
export class JewelryComponent implements OnInit, OnDestroy {

  PrivilegedUser = "PrivilegedUser";
  @ViewChild(PluginDirective) pluginHost: PluginDirective;
  jewelryForm : FormGroup;
  onCloseSub: Subscription;
  user: string;
  userType: string;

  constructor(
    private componentFactoryResolver: ComponentFactoryResolver,
    private router: Router,
    private route: ActivatedRoute,
    private jewelryService: JewelryService,
    private authService: AuthService
  ) {

  } 

  ngOnInit(): void {

    this.route.params.subscribe( param => {
      this.user = param.user;
    });

    this.authService.userLoggedin.subscribe((user: User)=> {
      this.userType = user.userType;
    })

    this.jewelryForm = new FormGroup({
      price : new FormControl(null),
      weight: new FormControl(null),
      discount: new FormControl(this.checkPrivilegedUser() ? 2 : null),
      totalPrice: new FormControl({ value: null, disabled: true})
    });
  }

  private checkPrivilegedUser() {
    return this.userType === this.PrivilegedUser;
  }

  onCalculate() {
    const jewelryDetail = this.jewelryForm.value;
    this.jewelryService.calculateTotal(jewelryDetail).subscribe( (result) => {
      this.jewelryForm.patchValue({
        totalPrice: result.totalPrice
      })
    });
  }

  onPopup() {

    const jewelryDetail = this.jewelryForm.getRawValue();

    //load popup component
    const popUpComponentFactory = this.componentFactoryResolver.resolveComponentFactory(PopUpComponent);
    const pluginHostContainerRef = this.pluginHost.vcRef;
    pluginHostContainerRef.clear();

    const popUpComponentRef = pluginHostContainerRef.createComponent(popUpComponentFactory);
    popUpComponentRef.instance.price = jewelryDetail.price;
    popUpComponentRef.instance.weight = jewelryDetail.weight;
    popUpComponentRef.instance.discount = jewelryDetail.discount;
    popUpComponentRef.instance.totalPrice = jewelryDetail.totalPrice;

    this.onCloseSub = popUpComponentRef.instance.close.subscribe(() =>{
      pluginHostContainerRef.clear();
    })
  }
  
  onPrintToFile() {
    const jewelryDetail = this.jewelryForm.getRawValue();
    this.jewelryService.printToFile(jewelryDetail).subscribe( result => {

      const a = document.createElement('a');
      const objectUrl = URL.createObjectURL(result.body);
      a.href = objectUrl;

      const contentDisposition = result.headers.get('content-disposition');
      a.download = contentDisposition.split('filename=')[1].split(';')[0]
      a.click();
      URL.revokeObjectURL(objectUrl);  
    })
  }
  
  onPrintPaper() {
    throw new Error('Method not implemented.');
  }

  onLogout() {
    this.router.navigate(['/'], { relativeTo: this.route })
    this.authService.logOff();
  }

  ngOnDestroy(): void {
    if(this.onCloseSub){
      this.onCloseSub.unsubscribe();
    }
  }
}
