import type { HangarClientCore } from '../core.js';
import type { ProjectChannel, Color, ChannelFlag } from '../../types/index.js';

export interface CreateChannelForm {
  name: string;
  description: string;
  color: Color;
  flags: ChannelFlag[];
}

export interface EditChannelForm extends CreateChannelForm {
  id: number;
}

export class InternalChannelsApi {
  constructor(private readonly core: HangarClientCore) {}

  checkColor(projectId: number, color: Color): Promise<void> {
    return this.core.requestVoid('internal/channels/checkColor', {
      query: { projectId, color },
    });
  }

  checkName(projectId: number, name: string): Promise<void> {
    return this.core.requestVoid('internal/channels/checkName', {
      query: { projectId, name },
    });
  }

  getChannels(project: string): Promise<ProjectChannel[]> {
    return this.core.requestJson<ProjectChannel[]>(
      `internal/channels/${encodeURIComponent(project)}`,
    );
  }

  createChannel(projectId: number, form: CreateChannelForm): Promise<ProjectChannel> {
    return this.core.requestJson<ProjectChannel>(
      `internal/channels/${projectId}/create`,
      { method: 'POST', body: form },
    );
  }

  editChannel(projectId: number, form: EditChannelForm): Promise<void> {
    return this.core.requestVoid(
      `internal/channels/${projectId}/edit`,
      { method: 'POST', body: form },
    );
  }

  deleteChannel(project: string, channel: string): Promise<void> {
    return this.core.requestVoid(
      `internal/channels/${encodeURIComponent(project)}/delete/${encodeURIComponent(channel)}`,
      { method: 'POST', body: {} },
    );
  }
}
