/**
 * Week 12: Angular Components, Data Binding & Directives Engine
 * Recreates Angular Component architecture:
 * 1. Interpolation: {{ title }}
 * 2. Property Binding: [disabled]="isLocked", [src]="avatarUrl"
 * 3. Event Binding: (click)="incrementScore()"
 * 4. Two-Way Binding: [(ngModel)]="gamerTag"
 * 5. Structural Directives: *ngIf, *ngFor, ngSwitch
 * 6. Attribute Directives: [ngClass], [ngStyle]
 */

// Simulated Angular Component Class: GameCardComponent
class AngularGameComponent {
  constructor() {
    // Component Properties
    this.title = "Target Shooter (Angular Component)";
    this.gamerTag = "NeonDuck99";
    this.score = 150;
    this.isVip = true;
    this.isCardLocked = false;
    this.selectedDifficulty = "Normal";

    this.gameList = [
      { id: 1, name: "Target Shooter", icon: "🎯", score: 850, status: "Active" },
      { id: 2, name: "Puzzle Quest", icon: "🧩", score: 920, status: "Active" },
      { id: 3, name: "Speed Racer", icon: "🏎️", score: 740, status: "Maintenance" },
      { id: 4, name: "Space Adventure", icon: "🚀", score: 1200, status: "Active" }
    ];
  }

  // Event Handlers
  onAddScore() {
    this.score += 25;
    this.render();
  }

  onResetScore() {
    this.score = 0;
    this.render();
  }

  toggleLock() {
    this.isCardLocked = !this.isCardLocked;
    this.render();
  }

  toggleVip() {
    this.isVip = !this.isVip;
    this.render();
  }

  setDifficulty(level) {
    this.selectedDifficulty = level;
    this.render();
  }

  updateGamerTag(newTag) {
    this.gamerTag = newTag;
    this.render();
  }

  // Angular Template Renderer
  render() {
    // 1. Interpolation: {{ gamerTag }}, {{ score }}, {{ title }}
    document.getElementById("interp_tag").innerText = this.gamerTag;
    document.getElementById("interp_score").innerText = this.score;
    document.getElementById("interp_title").innerText = this.title;

    // 2. Property Binding: [disabled]="isCardLocked"
    const actionBtn = document.getElementById("prop_bound_btn");
    if (actionBtn) {
      actionBtn.disabled = this.isCardLocked;
      actionBtn.style.opacity = this.isCardLocked ? "0.4" : "1.0";
      actionBtn.innerText = this.isCardLocked ? "⛔ Locked via [disabled]" : "🎯 Click: Play (Active)";
    }

    // 3. Two-Way Binding: [(ngModel)]="gamerTag"
    const tagInput = document.getElementById("twoway_input");
    if (tagInput && document.activeElement !== tagInput) {
      tagInput.value = this.gamerTag;
    }

    // 4. Structural Directive: *ngIf="isVip"
    const ngIfContainer = document.getElementById("ngif_container");
    if (ngIfContainer) {
      ngIfContainer.innerHTML = this.isVip
        ? `<div style="background:rgba(16,185,129,0.2); border:1px solid #10b981; padding:10px; border-radius:8px; color:#6ee7b7;">
             ⭐ <b>*ngIf="isVip" is TRUE:</b> Premium VIP Badge Displayed!
           </div>`
        : `<div style="background:rgba(239,68,68,0.2); border:1px solid #ef4444; padding:10px; border-radius:8px; color:#fca5a5;">
             🔒 <b>*ngIf="isVip" is FALSE:</b> Standard Free Tier Account.
           </div>`;
    }

    // 5. Structural Directive: *ngFor="let g of gameList"
    const ngForContainer = document.getElementById("ngfor_tbody");
    if (ngForContainer) {
      ngForContainer.innerHTML = this.gameList.map((g, idx) => `
        <tr style="border-bottom:1px solid #281452;">
          <td style="padding:8px 12px; color:#c084fc;">index: ${idx}</td>
          <td style="padding:8px 12px;">${g.icon} ${g.name}</td>
          <td style="padding:8px 12px; color:#34d399;">${g.score}</td>
          <td style="padding:8px 12px;">
            <span class="game-badge" style="background:${g.status === 'Active' ? '#10b981' : '#f59e0b'}; color:#fff;">
              ${g.status}
            </span>
          </td>
        </tr>
      `).join("");
    }

    // 6. Directive: [ngSwitch]="selectedDifficulty"
    const ngSwitchContainer = document.getElementById("ngswitch_container");
    if (ngSwitchContainer) {
      let switchText = "";
      switch (this.selectedDifficulty) {
        case "Easy":
          switchText = "🟢 *ngSwitchCase='Easy': Casual mode, targets move at 50% speed.";
          break;
        case "Normal":
          switchText = "🟡 *ngSwitchCase='Normal': Standard gameplay with 1.0x score multipliers.";
          break;
        case "Hard":
          switchText = "🔴 *ngSwitchCase='Hard': Extreme difficulty with 2.5x score bonuses!";
          break;
        default:
          switchText = "⚪ *ngSwitchDefault: Default difficulty mode.";
      }
      ngSwitchContainer.innerText = switchText;
    }

    // 7. Attribute Directives: [ngClass] and [ngStyle]
    const badgeEl = document.getElementById("attr_directive_box");
    if (badgeEl) {
      // [ngClass]="{'vip-card': isVip, 'locked-card': isCardLocked}"
      badgeEl.style.color = this.score >= 200 ? "#fbbf24" : "#ffffff";
      badgeEl.style.fontSize = this.score >= 200 ? "1.2rem" : "1rem";
      badgeEl.innerText = `[ngStyle] Dynamic Style: Current Score is ${this.score} ${this.score >= 200 ? '🔥 High Score Tier!' : ''}`;
    }
  }
}

const ngApp = new AngularGameComponent();

document.addEventListener("DOMContentLoaded", () => {
  ngApp.render();
  document.getElementById("twoway_input")?.addEventListener("input", (e) => {
    ngApp.updateGamerTag(e.target.value);
  });
});
