import { INTEGER, STRING, Model } from 'sequelize';
import db from '.';
import Match from './match.model';
// import OtherModel from './OtherModel';

class Team extends Model {
  public id?: number;
  public teamName!: string;
}

Team.init({
  // ... Campos
  id: {
    type: INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  teamName: {
    type: STRING,
    allowNull: false,
  },
}, {
  // ... Outras configs
  underscored: true,
  sequelize: db,
  modelName: 'teams',
  timestamps: false,
});

Team.hasMany(Match, { foreignKey: 'id', as: 'matches' });

Match.belongsTo(Team, { foreignKey: 'home_team', as: 'home-team' });
Match.belongsTo(Team, { foreignKey: 'away_team', as: 'away-team' });

/**
  * `Workaround` para aplicar as associations em TS:
  * Associations 1:N devem ficar em uma das instâncias de modelo
  * */

// OtherModel.belongsTo(Example, { foreignKey: 'campoA', as: 'campoEstrangeiroA' });
// OtherModel.belongsTo(Example, { foreignKey: 'campoB', as: 'campoEstrangeiroB' });

// Example.hasMany(OtherModel, { foreignKey: 'campoC', as: 'campoEstrangeiroC' });
// Example.hasMany(OtherModel, { foreignKey: 'campoD', as: 'campoEstrangeiroD' });

export default Team;
