export class RepComAgentModel {


  activityName: string;
  activityNumber: string;
  date: string;
  duration: string;
  place: string;
  numberAttendees: string;
  activityObjectives: string;
  resourcesUsed: string;
  methodologyUsed: string;
  activityDescriptionDevelopment: string;
  resourcesObtained: string;
  evidence: string;
  activityProfessionalIncharge: string;


  constructor(activityName: string,
              activityNumber: string,
              date: string,
              duration: string,
              place: string,
              numberAttendees: string,
              activityObjectives: string,
              resourcesUsed: string,
              methodologyUsed: string,
              activityDescriptionDevelopment: string,
              resourcesObtained: string,
              evidence: string,
              activityProfessionalIncharge: string,
  ) {
    this.activityName = activityName;
    this.activityNumber = activityNumber;
    this.date = date;
    this.duration = duration;
    this.place = place;
    this.numberAttendees = numberAttendees;
    this.activityObjectives = activityObjectives;
    this.resourcesUsed = resourcesUsed;
    this.methodologyUsed = methodologyUsed;
    this.activityDescriptionDevelopment = activityDescriptionDevelopment;
    this.resourcesObtained = resourcesObtained;
    this.evidence = evidence;
    this.activityProfessionalIncharge = activityProfessionalIncharge;
  }
}
